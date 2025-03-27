import deepface as Deepface


def face_verify():
 imgpath1=" "   #from database
 imgpath2=" "   #from webcam
 
 try:
  result = Deepface.verify(img1_path=imgpath1,img2_path=imgpath2)
  return result["verified"]
 except Exception as e:
  print("Error in face_verification")
  return False

