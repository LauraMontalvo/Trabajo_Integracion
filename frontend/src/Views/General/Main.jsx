import Cabecera from "../../Components/General/Cabecera"
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "../../Components/General/Carusel";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa las hojas de estilo de Bootstrap


const Main = () => {
  return (
    <div className="App">
      <Cabecera />
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.quitoinforma.gob.ec/wp-content/uploads/2022/08/Municipio-en-tu-barrio-visitara-Chavezpamba-800x445.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Primer Slide</h3>
              <p>Descripción del primer slide.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://ec.viajandox.com/uploads/attractive_2151.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Segundo Slide</h3>
              <p>Descripción del segundo slide.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://ec.viajandox.com/uploads/attractive_2152.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Tercer Slide</h3>
              <p>Descripción del tercer slide.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

    </div>
  );
}

export default Main;