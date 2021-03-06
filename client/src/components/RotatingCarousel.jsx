import React from 'react';
import { Carousel } from 'react-bootstrap/';
import styled from 'styled-components';
import carousel1 from './assets/carouselPhotos/carousel1.jpg';
import carousel2 from './assets/carouselPhotos/carousel2.jpg';
import carousel3 from './assets/carouselPhotos/carousel3.jpg';
import carousel4 from './assets/carouselPhotos/carousel4.jpg';
import carousel5 from './assets/carouselPhotos/carousel5.jpg';

/**
 * DOCS: https://react-bootstrap.github.io/components/carousel/
 */

const Img = styled.div`
    display: flex;
    width: 100%;
    height: 70vh;
    min-height: 250px;
    padding: 1rem 1.5rem;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
    }
`;

const RotatingCarousel = () => {
  const images = [carousel1, carousel2, carousel3, carousel4, carousel5];
  return (
    <Carousel >
      { images.map((image, i) => (
        <Carousel.Item key = {i} >
          <Img>
            <img
              className="rounded mx-auto d-block w-100"
              src={image}
              alt="Responsive image"
            />
          </Img>
        </Carousel.Item>
      ))}
    </Carousel>

  );
};

export default RotatingCarousel;
