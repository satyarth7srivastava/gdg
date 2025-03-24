import os
import cv2
from deepface import DeepFace


def capture_and_verify_face(voters_id):
    os.makedirs("captured_faces", exist_ok=True)

    video_capture = cv2.VideoCapture(0)
    if not video_capture.isOpened():
        print("Error: Could not access the camera.")
        return False

    print("Press 's' to capture the image.")
    img2_path = f'captured_faces/{voters_id}.jpg'

    while True:
        ret, frame = video_capture.read()
        if not ret:
            print("Failed to capture image. Exiting...")
            break

        cv2.imshow("Webcam - Press 's' to capture", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('s'):
            cv2.imwrite(img2_path, frame)
            break
        elif key == ord('q'):
            print("Exiting without saving image.")
            break

    video_capture.release()
    cv2.destroyAllWindows()

    img1_path = f"facial_data/{voters_id}.jpg"

    if not os.path.exists(img1_path):
        print("Voter's registered image not found.")
        return False

    try:
        result = DeepFace.verify(img1_path=img1_path, img2_path=img2_path)
        return result["verified"]
    except Exception as e:
        print(f"Error in face verification: {e}")
        return False
