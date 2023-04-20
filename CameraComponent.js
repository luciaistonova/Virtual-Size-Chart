import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';


const CameraComponent = () => {
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: "environment"
  });

  const handleCameraChange = () => {
 
    const newFacingMode =
      videoConstraints.facingMode === "user" ? "environment" : "user";
      setVideoConstraints({ facingMode: newFacingMode });
    };

  const webcamRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [remainingTime, setRemainingTime] = useState(5);
  const [isDisabled, setIsDisabled] = useState(false);
  const [measurement, setMeasurement] = useState(null);

  async function handleButtonClick() {
    setIsDisabled(true);
  
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
  
    try {
        setTimeout(async () => {
        clearInterval(intervalId);
        setIsDisabled(false);
        setRemainingTime(5);
  
        const imageSrc = webcamRef.current.getScreenshot();
        setImageData(imageSrc);
  
        const modelUrl = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
        const model = await tf.loadLayersModel(modelUrl);

   
        const inputHeight = 300;
        const inputWidth = 400;
  
        const image = tf.browser.fromPixels(webcamRef.current.video);
        const resizedImage = tf.image.resizeBilinear(image, [inputHeight, inputWidth]);
  
        const normalizedImage = tf.div(tf.sub(resizedImage, [0]), [255]);
  
        const batchedInput = normalizedImage.expandDims();
  
       const outputPromise = model.predict(batchedInput);
       if (outputPromise instanceof Promise) {
        const output = await outputPromise;
        processPrediction(output);
      } else {
        const output = outputPromise;
        processPrediction(output);
      }
      
        setMeasurement(measurement);
  
        console.log(`Measurement: ${measurement}`);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }
  
  function processPrediction(inputs) {
    const predictedValues = inputs.arraySync()[0]; 
    const maxIndex = predictedValues.indexOf(Math.max(...predictedValues)); 
    return maxIndex;
}


  return (
    <>
      <Webcam
        audio={false}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        onUserMediaError={() => console.log("User media error")}
        onUserMedia={() => console.log("User media success")}
        ref={webcamRef}
      />
      <div>
        <button onClick={handleCameraChange} variant="dark" className="close-button">
          SIZE
        </button>
        <Button variant="danger" className="SNAP" onClick={handleButtonClick} disabled={isDisabled}>
          {isDisabled ? `SNAP (${remainingTime})` : "SNAP"}
        </Button>
      </div>
      {measurement && (
        <p>Measurement: {measurement}</p>
      )}
      {imageData && (
        <div className="img-container" style={{ alignItems: "center" }}>
          <img src={imageData} alt="Captured" height={300} width={400} />
        </div>
      )}
    </>
  );
};

export default CameraComponent;
