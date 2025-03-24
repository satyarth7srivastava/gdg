import numpy as np
import cv2


def scan_qr_code():
    cap = cv2.VideoCapture(0)
    detector = cv2.QRCodeDetector()

    voters_id = None
    while True:
        ret, img = cap.read()
        if not ret:
            print("Failed to capture image")
            break

        data, bbox, _ = detector.detectAndDecode(img)

        if bbox is not None and data:
            bbox = np.int32(bbox)
            for i in range(len(bbox[0])):
                cv2.line(
                    img,
                    tuple(bbox[0][i]),
                    tuple(bbox[0][(i + 1) % len(bbox[0])]),
                    color=(255, 0, 0),
                    thickness=2
                )
            voters_id = data.split(",")[1]  # Extract voter ID
            break  # Exit loop after detecting the QR code

        cv2.imshow("QR Code Scanner", img)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()

    return voters_id
