import './App.css';
import CameraComponent from './CameraComponent';
import SizeChartApp from './SizeChartApp';

function App(){
  return (
    <div className="screen-window">
      <div className="launch-screen">
        <div>
          <CameraComponent />
        </div>
        <div>
          <SizeChartApp />
        </div>
        <div className="rectangle-7">
          <span ></span>
        </div>
        <div className="products">
          <img
            className="product-1"
            src="Pictures/5.png"
            alt=""
            id="product1"
  
          />
          <div className="flex-container">
            <span className="choose-product"> CHOOSE PRODUCT</span>
            <img
              className="product-3"
              src="Pictures/6.png"
              alt=""
              id="product2"
            />
          </div>
          <img
            className="product-5"
            src="Pictures/7.png"
            alt=""
            id="product3"
          />
        </div>
      </div>
      <div className="rectangle">

          <img
            className="rectangle-1"
            src="Pictures/1.png"
            alt=""
            id="image1"
    
          />

          <div className="flex-container">
        

            <img
              className="rectangle-3"
              src="Pictures/2.png"
              alt=""
              id="image2"
  
            />
          </div>
          <img
            className="rectangle-5"
            src="Pictures/3.png"
            alt=""
            id="image3"
  
          />
        </div>
      </div>
    
  );
}

export default App;
