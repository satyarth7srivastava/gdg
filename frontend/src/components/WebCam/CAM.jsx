import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const Cam = ({ setImage }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Capture the image
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setImage(imageSrc); 
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {capturedImage ? (
        <>
          <img src={capturedImage} alt="Captured" className="rounded-lg w-64 h-48 object-cover" />
          <button
            onClick={() => setCapturedImage(null)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Retake
          </button>
        </>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg w-64 h-48 object-cover"
          />
          <button
            onClick={capture}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Capture Image
          </button>
        </>
      )}
    </div>
  );
};

export default Cam;
