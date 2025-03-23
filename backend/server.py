from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil


from typing import List


app = FastAPI()

# Add CORS settings to allow frontend to access the backend
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
