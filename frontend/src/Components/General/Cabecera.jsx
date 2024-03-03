import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../../Styles/header.scss"; // Importa tus estilos personalizados
import * as constantes from '../../Models/Constantes'
const Cabecera = () => {
  return (

    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/" className="titulo-Chavp">
        <h2>{constantes.TEXTO_TITULO}</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
        <Nav className="mr-auto" variant="tabs">
          <NavDropdown title="Iniciar Sesión" id="nav-dropdown">
            <NavDropdown.Item as={Link} to="/loginusuario">Como Usuario</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/empresa">Como Empresa</NavDropdown.Item>
          </NavDropdown>

        </Nav>


      </Navbar.Collapse>
    </Navbar>





  );
};

export default Cabecera;
