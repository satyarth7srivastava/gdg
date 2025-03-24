import qreader
import face_verification


def main():
    print("[+] Scanning QR Code...")
    voters_id = qreader.scan_qr_code()

    if not voters_id:
        print("[-] No QR code detected. Exiting...")
        return

    print(f"[+] Voter ID Detected: {voters_id}")
    print("[+] Capturing and verifying face...")

    if face_verification.capture_and_verify_face(voters_id):
        print("[✔] Face Match Successful!")
    else:
        print("[✖] Face Match Failed.")


if __name__ == "__main__":
    main()
