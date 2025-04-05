from deepface import DeepFace as df
import base64

with open("./tp.jpg", "rb") as image_file:
    imageBase64_image1 = base64.b64encode(image_file.read()).decode('utf-8')
with open("./tp2.jpg", "rb") as file:
    imageBase64_image2 = base64.b64encode(file.read()).decode('utf-8')

res = df.verify(img1_path = imageBase64_image1, img2_path = imageBase64_image2, model_name = "VGG-Face", detector_backend = "opencv", enforce_detection = False, distance_metric = "cosine", normalization = "base64")
print(res["verified"])
print(res["distance"])