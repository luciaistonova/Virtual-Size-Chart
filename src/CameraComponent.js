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
    // Toggle between 'user' and 'environment' modes
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
  
        // Capture an image from the webcam and set it as imageData
        const imageSrc = webcamRef.current.getScreenshot();
        setImageData(imageSrc);
  
        // Load the pre-trained model
        const modelUrl = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
        const model = await tf.loadLayersModel(modelUrl);

  
        // Define inputHeight and inputWidth constants
        const inputHeight = 300;
        const inputWidth = 400;
  
        // Convert the image to a tensor and resize it to match the input shape expected by the model
        const image = tf.browser.fromPixels(webcamRef.current.video);
        const resizedImage = tf.image.resizeBilinear(image, [inputHeight, inputWidth]);
  
        // Normalize the pixel values to be between 0 and 1
        const normalizedImage = tf.div(tf.sub(resizedImage, [0]), [255]);
  
        // Reshape the input to match the shape expected by the model
        const batchedInput = normalizedImage.expandDims();
  
        // Make a prediction on the input and extract the desired output
       // Make a prediction on the input and extract the desired output
       const outputPromise = model.predict(batchedInput);
       if (outputPromise instanceof Promise) {
        const output = await outputPromise;
        processPrediction(output);
      } else {
        const output = outputPromise;
        processPrediction(output);
      }
      
        // Update the state with the measurement
        setMeasurement(measurement);
  
        // Display the measurement in the console
        console.log(`Measurement: ${measurement}`);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }
  
  function processPrediction(inputs) {
    const predictedValues = inputs.arraySync()[0]; // Convert the tensor data to an array
    const maxIndex = predictedValues.indexOf(Math.max(...predictedValues)); // Find the index of the max value
    return maxIndex; // Return the index of the max value as the prediction
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
        <Button variant="danger" onClick={handleButtonClick} disabled={isDisabled}>
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
