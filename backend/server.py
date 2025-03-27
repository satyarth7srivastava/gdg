from fastapi import FastAPI, Form, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional
import mysql.connector
from mysql.connector import Error
import uuid
from typing import Annotated

from typing import List


app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "1234"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

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

import deepface as Deepface


def face_verify(path1: str, path2: str):
 imgpath1 = path1   #from database
 imgpath2 = path2   #from webcam
 
 try:
  result = Deepface.verify(img1_path=imgpath1,img2_path=imgpath2)
  return result["verified"]
 except Exception as e:
  print("Error in face_verification")
  return False



def connect_to_database():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='voter_db',
            user='root',
            password='helloishu1'
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )

def verify_user(VoterID: int, password: str):
    conn = connect_to_database()
    if not conn.is_connected():
        return False
    cursor = conn.cursor()
    if cursor is None:
        print("Error while connecting to database")
        return False
    cursor.execute(f"SELECT * FROM users WHERE VoterID='{VoterID}'")
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user is None:
        return False
    if not verify_password(password, user[1]):
        return False
    return True

def hash_and_store_password(VoterID: int, password: str):
    conn = connect_to_database()
    if not conn.is_connected():
        return False
    cursor = conn.cursor()
    hashed_password = get_password_hash(password)
    cursor.execute(f"UPDATE users SET passwordHashed='{hashed_password}' WHERE VoterID='{VoterID}'")
    conn.commit()
    cursor.close()
    conn.close()
    return True

def save_image(image: UploadFile):
    imageID = uuid.uuid4();
    imageID = str(imageID)
    file_location = f"images/{imageID + image.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    return imageID + image.filename

def register_user(VoterID: int, password: str, role: str, image: UploadFile, wallet: str):
    conn = connect_to_database()
    if not conn.is_connected():
        return False
    cursor = conn.cursor()
    hashed_password = get_password_hash(password)
    imageID = save_image(image)
    access_token = create_access_token(data={"sub": VoterID}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    expiry = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    cursor.execute(f"INSERT INTO users (VoterID, passwordHashed, role, authToken, tokenExpiry, imageURL, wallet) VALUES ({VoterID}, '{hashed_password}', '{role}',  '{access_token}', '{expiry}', '{imageID}', '{wallet}');")
    conn.commit()
    cursor.close()
    conn.close()
    return True

# Add CORS settings to allow frontend to access the backend
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
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

@app.post("/imageAuth")
async def imageAuth(file: UploadFile):
    file_loacation = f"images/{file.filename}"
    # Save the uploaded image to the images folder
    # with the same name as the uploaded file
    with open(file_loacation, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename}

@app.post("/login")
async def login(user: User):
    if not verify_user(user.VoterID, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.VoterID}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/hash_password")
async def hash_password(user: User):
    if hash_and_store_password(user.VoterID, user.password):
        return {"status": "password hashed and stored"}
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to hash and store password"
        )

@app.post("/register")
async def register(VoterID : Annotated[int, Form()], password : Annotated[str, Form()], role : Annotated[str, Form()], image: UploadFile, wallet: Annotated[str, Form()]):
    #adjusting according to db
    VoterID = int(VoterID)
    password = str(password)
    role = str(role)
    wallet = str(wallet)
    if not register_user(VoterID, password, role, image, wallet):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to register user"
        )
    return {"status": "user registered"}

#face_verification



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
