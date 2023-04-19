import React, { useState, useEffect } from 'react';
import './App.css';
import CameraComponent from './CameraComponent';

function App() {
  const [clientSize, setClientSize] = useState('');
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setClientSize('Small');
      } else if (screenWidth > 768 && screenWidth < 992) {
        setClientSize('Medium');
      } else {
        setClientSize('Large');
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleRectangleClick(event) {
    // Get the id of the clicked rectangle image
    const id = event.target.id;

    // Do something with the clicked rectangle image (e.g. navigate to a new page)
    console.log(`You clicked on rectangle image ${id}`);
  }

  function handleImageClick(event) {
    // Get the source of the clicked image and set it as the selected image URI
    setImageUri(event.target.src);
  }

  return (
    <div className="screen-window">
      <div className="launch-screen">
        <div>
          <CameraComponent />
        </div>
        <div className="rectangle-7">
          <span className="recomended-size-for-you">
            Recommended size for you:
          </span>
          <span className="s">{clientSize}</span>
        </div>
        <div className="rectangle">
          {/* Add click event listener to first rectangle image */}
          <img
            className="rectangle-1"
            src="Pictures/1.png"
            alt=""
            id="image1"
            onClick={handleImageClick}
          />

          <div className="flex-container">
            <span className="choose-brand">From Brands</span>
            {/* Add click event listener to second rectangle image */}
            <img
              className="rectangle-3"
              src="Pictures/2.png"
              alt=""
              id="image2"
              onClick={handleImageClick}
            />
          </div>

          {/* Add click event listener to third rectangle image */}
          <img
            className="rectangle-5"
            src="Pictures/3.png"
            alt=""
            id="image3"
            onClick={handleImageClick}
          />
        </div>
      </div>
      <div className="image-display">
        {/* Render the selected image in a centered camera component */}
        {imageUri ? (
          <CameraComponent>
            <img src={imageUri} alt="" />
          </CameraComponent>
        ) : null}
      </div>
    </div>
  );
}

export default App;
