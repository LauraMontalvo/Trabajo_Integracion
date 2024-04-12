import Cabecera from "../../Components/General/Cabecera"
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "../../Components/General/Carusel";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

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
              <h3>
                Parroquia Chavezpamba de Quito</h3>
              <p>La parroquia de Chavezpamba se encuentra ubicada a 2130 msnm, a unas dos horas y media en bus al norte de Quito, con un clima subtropical y una temperatura promedio de 20 °C cuya superficie es de 12,28 km².</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://ec.viajandox.com/uploads/attractive_2151.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Si visitas Chavezpamba debes conocer</h3>
              <p>Iglesia parroquial En 1950 tuvo lugar la construcción de este templo, el cual está hecho con ladrillo, barro amasado y madera. 
                Cerro Itagua Mirador natural que ofrece una espectacular vista de la parroquia y sus alrededores. 
                El río Cubí que colinda con las hermanas parroquias de Minas, Chavezpamba y Atahualpa.
                El Parque Central ubicado en el céntro poblado de la Parroquia.
                </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://ec.viajandox.com/uploads/attractive_2152.jpg"
              alt="Third slide"
            />
         <Carousel.Caption>
    <h3>Historia</h3>
    <p>Conoce más ingresando al siguiente enlace: <a href="https://chavezpambaturistica.com/historia/" >Historia de Chávez Pamba Turística</a></p>
</Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

    </div>
  );
}

export default Main;