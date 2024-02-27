import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/header.scss";
import axios from 'axios';
import * as constantes from '../../Models/Constantes';

const CabeceraUsuarioInicio = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const handleLogout = () => {
    // Aquí puedes agregar la lógica para manejar el cierre de sesión
    // Por ejemplo, limpiar el estado global, eliminar tokens, etc.
    navigate("/loginusuario");
  };

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    handleLogout();
    handleCloseLogoutModal();
  };


  // Determina la página actual basándose en la URL
  const enPerfilUsuario = location.pathname.includes(`/detalleUsuario/${id}`);

 
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/user/${id}`)
        .then((res) => {
          // Manejar respuesta
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (

    <>
      <Navbar bg="light" expand="lg" className="mb-4">

        <Navbar.Brand  className="titulo-Chavp">
          <h2>{constantes.TEXTO_TITULO}</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={`/resumenUsuario/${id}/usuario`}>Inicio</Nav.Link>
            {enPerfilUsuario ? (
              <Nav.Link as={Link} to={`/buscarEmpleos/${id}`}>
                <FontAwesomeIcon icon={faSearch} /> Buscar Empleo
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to={`/detalleUsuario/${id}`}>

                Ver mi Perfil
              </Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>
        <Button
          variant="outline-danger"
          onClick={handleShowLogoutModal}
          className="ml-auto d-none d-lg-block"
        >
          Cerrar Sesión
        </Button>
        <Button
          variant="outline-danger"
          onClick={handleShowLogoutModal}
          className="ml-auto d-lg-none"
        >
          <FontAwesomeIcon icon={faSignOutAlt} /> {/* Icono de cerrar sesión */}
        </Button>
        <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar cierre de sesión</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que quieres cerrar sesión?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLogoutModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmLogout}>
              Cerrar Sesión
            </Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
    </>

  );
};

export default CabeceraUsuarioInicio;
