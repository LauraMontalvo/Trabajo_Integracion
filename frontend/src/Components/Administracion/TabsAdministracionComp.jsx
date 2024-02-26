import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import "../../Styles/header.scss";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes'
import RegistroInstituciones from "./RegistroInstitucionesView";
import RegistroEmpresa from "./RegistroEmpresa";
import RegistroUsuario from "./RegistroUsuario";
import RegistroAdministrador from "./RegistroAdministrador";
import RegistroEmpresaExterna from "./RegistroEmpresaExterna";
const TabsAdministracionComp = ({ onAddInstitucion, onAddEmpresa, onRecargarUsuarios, onRecargarAdministradores }) => {
  const [showRegisterInstitutionModal, setShowRegisterInstitutionModal] = useState(false);
  const [showRegisterCompanyModal, setShowRegisterCompanyModal] = useState(false);
  const [showRegisterCompanyExternalModal, setShowRegisterCompanyExternalModal] = useState(false);

  const [showRegisterUserModal, setShowRegisterUserModal] = useState(false);
  const [showRegisterAdminModal, setShowRegisterAdminModal] = useState(false);
  const { id } = useParams();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/admin");
  };

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleConfirmLogout = () => {
    handleLogout();
    handleCloseLogoutModal();
  };



  const handleShowRegisterAdminModal = () => setShowRegisterAdminModal(true);
  const handleCloseRegisterAdminModal = () => setShowRegisterAdminModal(false);

  const handleShowRegisterUserModal = () => {
    setShowRegisterUserModal(true);
  };

  const handleCloseRegisterUserModal = () => {
    setShowRegisterUserModal(false);
  };

  const handleShowRegisterInstitutionModal = () => {
    setShowRegisterInstitutionModal(true);
  };

  const handleCloseRegisterInstitutionModal = () => {
    setShowRegisterInstitutionModal(false);
  };

  const handleShowRegisterCompanyModal = () => {
    setShowRegisterCompanyModal(true);
  };
  const handleShowRegisterCompanyExternalModal = () => {
    setShowRegisterCompanyExternalModal(true);
  };
  const handleCloseRegisterCompanyExternalModal = () => {
    setShowRegisterCompanyExternalModal(false);
  };
  const handleCloseRegisterCompanyModal = () => {
    setShowRegisterCompanyModal(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand className="titulo-Chavp">
          <h2>{constantes.TEXTO_TITULO}
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" variant="tabs">
            <Nav.Link as={Link} to={`/admin/consola/${id}`}>Inicio</Nav.Link>
            <NavDropdown title="Empresas" id="nav-dropdown">
              <NavDropdown.Item as={Link} to={`/admin/consola/listaEmpresas/${id}`}>Ver Empresas</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShowRegisterCompanyModal}>Registrar Empresa</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShowRegisterCompanyExternalModal}>Registrar Empresa Externa</NavDropdown.Item>

            </NavDropdown>
            <NavDropdown title="Administradores" id="nav-dropdown">
              <NavDropdown.Item as={Link} to={`/admin/consola/listaAdministradores/${id}`}>Ver Administradores</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShowRegisterAdminModal}>Registrar Administrador</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Usuarios" id="nav-dropdown">
              <NavDropdown.Item as={Link} to={`/admin/consola/listaUsuarios/${id}`}>Ver Usuarios</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShowRegisterUserModal}>Registrar Usuarios</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Instituciones" id="nav-dropdown">
              <NavDropdown.Item as={Link} to={`/admin/consola/listaInstituciones/${id}`} >Lista Instituciones</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShowRegisterInstitutionModal}>
                Registrar Institucion</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to={`/admin/consola/listaPostulacionesAdmin/${id}`}>Lista Empleos</Nav.Link>


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
      {/* Modal para registrar instituciones */}
      <Modal show={showRegisterInstitutionModal} onHide={handleCloseRegisterInstitutionModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Institución</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistroInstituciones onInstitucionRegistered={onAddInstitucion} onCloseRegisterModal={handleCloseRegisterInstitutionModal} />
        </Modal.Body>
      </Modal>

      <Modal show={showRegisterCompanyModal} onHide={handleCloseRegisterCompanyModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistroEmpresa onEmpresaRegistered={onAddEmpresa} onCloseRegisterModal={handleCloseRegisterCompanyModal} />
        </Modal.Body>
      </Modal>
      {/*empresa externa*/}
      <Modal show={showRegisterCompanyExternalModal} onHide={handleCloseRegisterCompanyExternalModal} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Registrar Empresa Externa</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <RegistroEmpresaExterna onEmpresaRegistered={onAddEmpresa} onCloseRegisterModal={handleCloseRegisterCompanyExternalModal} />
  </Modal.Body>
</Modal>

      <Modal show={showRegisterUserModal} onHide={handleCloseRegisterUserModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistroUsuario onRecargarUsuarios={onRecargarUsuarios} />
        </Modal.Body>
      </Modal>
      <Modal show={showRegisterAdminModal} onHide={handleCloseRegisterAdminModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistroAdministrador onRegistroExitoso={onRecargarAdministradores} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TabsAdministracionComp;
