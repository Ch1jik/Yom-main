import React, { useState } from 'react';
import '../../assets/css/style.css';
import { Link } from 'react-router-dom';
import arrow from '../../assets/images/arrow.svg'
interface Slide {
  imageUrl: string;
  title:string;
  text: string;

}
interface CarouselCompProps {
  slides: Slide[]
}


const CarouselComp: React.FC<CarouselCompProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel-container">
     <div className="carousel-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className={`carousel-slide${index}`} key={index}>
            {/* <img src={slide.imageUrl} alt={`Slide ${index}`} /> */}
            {/* <div>
              <h1 className="carousel-slide-title">{slide.text}</h1>
            </div> */}
            <div className={`carousel-slider-section${index}`}>
              <div className={`carousel-slide-text-block${index}`}>
              <h1 className="carousel-slide-title">{slide.title}</h1>
                <h1 className="carousel-slide-text">{slide.text}</h1>
                <Link className="carousel-slide-button remove-style-from-link" to={'/usercare'}>Дивитись все <img src={arrow}></img></Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-button prev" onClick={prevSlide}>&lt;</button>
      <button className="carousel-button next" onClick={nextSlide}>&gt;</button>
      <div className="carousel-status">{currentIndex + 1} / {slides.length}</div>
    </div>
  );
}

export default CarouselComp;
