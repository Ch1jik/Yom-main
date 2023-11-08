import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import '../../assets/css/style.css';

interface VerticalImageSliderProps {
  images: string[];
}

const VerticalImageSlider: React.FC<VerticalImageSliderProps> = ({ images = []  }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="productById-image-section">
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
      {/* <div className='react-slider-bar'> */}
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
      {/* </div> */}
      <div className="productById-big-image">
        <img src={images[selectedImageIndex]} alt="Selected" />
      </div>
    </div>
  );
};

export default VerticalImageSlider;
