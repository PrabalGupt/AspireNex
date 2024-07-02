import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import '../css/global.css'; // Import the new CSS file
import '../css/heroCarousel.css'
const heroImages = [
  { imgUrl: '/assets/images/hero-1.svg', alt: 'smartwatch' },
  { imgUrl: '/assets/images/hero-2.svg', alt: 'bag' },
  { imgUrl: '/assets/images/hero-3.svg', alt: 'lamp' },
  { imgUrl: '/assets/images/hero-4.svg', alt: 'air fryer' },
  { imgUrl: '/assets/images/hero-5.svg', alt: 'chair' },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image, index) => (
          <div key={index}>
            <img 
              src={image.imgUrl}
              alt={image.alt}
              width={484}
              height={484}
              className="object-contain"
            />
          </div>
        ))}
      </Carousel>

      <img 
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="arrow-icon"
      />
    </div>
  );
};

export default HeroCarousel;
