from fastapi import FastAPI, Form, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional
import uuid
from typing import Annotated
from typing import List
from pymongo import MongoClient
from deepface import DeepFace as df
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Load environment variables from .env file
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

# Pydantic models
class Token(BaseModel):
    access_token: str
    token_type: str
class User(BaseModel):
    VoterID: int
    password: str
class RegisterUser(BaseModel):
    VoterID: int
    password: str
    role: str
    wallet: str

#Helper functions
def save_image(imageBase64: str):
    imgdata = base64.b64decode(imageBase64)
    filename = 'image.jpg'
    with open(filename, 'wb') as f:
        f.write(imgdata)
    return filename

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    #generate a jwt token with size 50
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

import base64


def face_verify(imageBase64: str, path2: str):
 imageBase64 = imageBase64.split(",")[1]
 imgdata = base64.b64decode(imageBase64)
 filename = 'tp.jpg'
 with open(filename, 'wb') as f:
    f.write(imgdata)

 imgpath1 = "tp.jpg"  #from frontend
 imgpath2 = "./images/" + path2   #from database

 
 try:
  result = df.verify(img1_path=imgpath1, img2_path=imgpath2, enforce_detection=False)
  return result["verified"]
 except Exception as e:
  print("Error in face_verification: ", e)
  return False

def connect_to_database():
    try:
        client = MongoClient(os.getenv("MONGO_URI"))
        db = client["voter_db"]
        print("Connected to MongoDB database")
        return db
    except Exception as e:
        print(f"Error while connecting to MongoDB: {e}")
        raise HTTPException(
            status_code=500,
            detail="Database connection failed"
        )

def verify_user(VoterID: int, password: str, address: str):
    db = connect_to_database()
    user = db.users.find_one({"VoterID": VoterID})
    if user is None:
        return False
    if not verify_password(password, user["passwordHashed"]):
        return False
    if not address == user["wallet"]:
        return False
    return True

def save_image(image: UploadFile):
    imageID = uuid.uuid4()
    imageID = str(imageID)
    file_location = f"images/{imageID + image.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    return imageID + image.filename

def register_user(VoterID: int, password: str, role: str, image: UploadFile, wallet: str):
    db = connect_to_database()
    imageID = save_image(image)
    hashed_password = get_password_hash(password)
    access_token = create_access_token(data={"sub": VoterID}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    expiry = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    user_data = {
        "VoterID": VoterID,
        "passwordHashed": hashed_password,
        "role": role,
        "authToken": access_token,
        "tokenExpiry": expiry,
        "imageURL": imageID,
        "wallet": wallet
    }
    try:
        db.users.insert_one(user_data)
        return True
    except Exception as e:
        print(f"Error while registering user: {e}")
        return False

# Add CORS settings to allow frontend to access the backend
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/status")
async def status():
    return {"status": "ok"}


@app.post("/login")
async def login(VoterID : Annotated[int, Form()], password : Annotated[str, Form()], imageBase64 : Annotated[str, Form()], address : Annotated[str, Form()]):
    if not verify_user(VoterID, password, address):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    db = connect_to_database()
    user = db.users.find_one({"VoterID": VoterID})
    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Failed to fetch user data"
        )
    if not face_verify(imageBase64, user["imageURL"]):
        raise HTTPException(
            status_code=401,
            detail="Face verification failed"
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": VoterID}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "role": user["role"]}


@app.post("/register")
async def register(VoterID : Annotated[int, Form()], password : Annotated[str, Form()], role : Annotated[str, Form()], image: UploadFile, wallet: Annotated[str, Form()]):
    #adjusting according to db
    VoterID = int(VoterID)
    password = str(password)
    role = str(role)
    wallet = str(wallet)
    if not register_user(VoterID, password, role, image, wallet):
        raise HTTPException(
            status_code=500,
            detail="Failed to register user"
        )
    return {"status": "user registered"}

#face_verification



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
