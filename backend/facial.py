from deepface import DeepFace as df

res = df.verify(img1_path="tp.jpg", img2_path="./images/25e06d36-3b2a-4ee5-a5fa-a623658b4744WIN_20250328_14_29_32_Pro.jpg", enforce_detection=False)
print(res["verified"])
print(res["distance"])