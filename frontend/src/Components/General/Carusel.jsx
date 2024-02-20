// components/ExampleCarouselImage.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import "../../Styles/carusel.css"
function ExampleCarouselImage({ imageUrl, description }) {
  return (
    <Card className="carousel-card">
      <Card.Img variant="top" src={imageUrl} alt="Imagen del carrusel" className="img-fluid" />
      <Card.Body className="carousel-body">
        <Card.Text className="carousel-description">
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ExampleCarouselImage;
