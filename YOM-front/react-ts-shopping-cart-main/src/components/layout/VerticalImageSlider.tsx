import React, { useState,useEffect } from 'react';
import ReactSlider from 'react-slider';
import '../../assets/css/style.css';

interface VerticalImageSliderProps {
  images: string[];
}

const VerticalImageSlider: React.FC<VerticalImageSliderProps> = ({ images = []  }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [sliderClassName, setSliderClassName] = useState('vertical-slider');

  // Function to update the slider class name based on screen width
  const updateSliderClassName = () => {
    if (window.innerWidth <= 768) {
      setSliderClassName('horizontal-slider');
    } else {
      setSliderClassName('vertical-slider');
    }
  };
  useEffect(() => {
    updateSliderClassName(); // Initial class name based on screen width

    // Add an event listener to update the class name on window resize
    window.addEventListener('resize', updateSliderClassName);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateSliderClassName);
    };
  }, []);
  return (
    <div className="productById-image-section">
      
      {/* <div className='react-slider-bar'> */}
      {sliderClassName==="vertical-slider"?(
        <>
        <div className="productById-image-slider">
        {images.map((img, index) => (
          <div>
            <img
              key={index}
              src={img}
              alt={`Thumbnail-${index}`}
              onClick={() => setSelectedImageIndex(index)}
              className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
              
            />
          </div>
        ))}
      </div>
      <ReactSlider
        className="vertical-slider"
        thumbClassName="slider-thumb"
        trackClassName="slider-track"
        min={0}
        max={images.length - 1}
        value={selectedImageIndex}
        onChange={value => setSelectedImageIndex(value)}
        renderThumb={(props) => <div {...props} className="slider-thumb"></div>}
        renderTrack={(props, state) => <div {...props} className={`slider-track ${state.index === 0 ? 'slider-track-0' : 'slider-track-1'}`}></div>}
        orientation="vertical"
      />
      <div className="productById-big-image">
        <img src={images[selectedImageIndex]} alt="Selected" />
      </div>
      </>
      ):(
        <>
        <div className="productById-big-image">
        <img src={images[selectedImageIndex]} alt="Selected" />
        </div>
        <ReactSlider
        className="horizontal-slider"
        // thumbClassName="slider-thumb"
        // trackClassName="slider-track"
        min={0}
        max={images.length - 1}
        value={selectedImageIndex}
        onChange={value => setSelectedImageIndex(value)}
        // renderThumb={(props) => <div {...props} className="slider-thumb"></div>}
        // renderTrack={(props, state) => <div {...props} className={`slider-track ${state.index === 0 ? 'slider-track-0' : 'slider-track-1'}`}></div>}
        orientation="horizontal"
      />
      <div className="productById-image-slider">
        {images.map((img, index) => (
          <div>
            <img
              key={index}
              src={img}
              alt={`Thumbnail-${index}`}
              onClick={() => setSelectedImageIndex(index)}
              className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
              
            />
          </div>
        ))}
      </div>
      </>
      )}
      {/* </div> */}
      {/* <div className="productById-big-image">
        <img src={images[selectedImageIndex]} alt="Selected" />
      </div> */}
    </div>
  );
};

export default VerticalImageSlider;
