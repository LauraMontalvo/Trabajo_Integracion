import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/header.scss";
import axios from 'axios';
import * as constantes from '../../Models/Constantes';

const CabeceraEmpresaInicioComp = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    navigate("/empresa");
  };

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleConfirmLogout = () => {
    handleLogout();
    handleCloseLogoutModal();
  };

  // Determina si el usuario está actualmente viendo su perfil
  const viendoPerfil = location.pathname.includes(`/detalleEmpresa/${id}`);

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand className="titulo-Chavp">
        <h2>{constantes.TEXTO_TITULO}</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

          <Nav.Link as={Link} to={`/resumen/${id}/empresa`}>Inicio</Nav.Link>


          {!viendoPerfil && (
            <Nav.Link as={Link} to={`/detalleEmpresa/${id}`}>
              Ver Mi Perfil
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
        <Modal.Body>¿Estás seguro de que quieres cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmLogout}>Cerrar Sesión</Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default CabeceraEmpresaInicioComp;

