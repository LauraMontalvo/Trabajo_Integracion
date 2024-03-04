import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Modal, Container, Row, Col } from 'react-bootstrap';

import { FaBuilding, FaUsers, FaUniversity, FaChartBar, FaPaperPlane, FaUserPlus } from 'react-icons/fa'; // Importar iconos
import axios from 'axios';
import * as constantes from '../../Models/Constantes';
import TabsAdministracionComp from '../../Components/Administracion/TabsAdministracionComp';
import ListaEmpresas from './ListaEmpresas';
import ListaUsuarios from './ListaUsuarios';
import ListaInstituciones from './ListaInstituciones';
import '../../Styles/Administrador.scss';
import "../../Styles/header.scss";
const Main = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [modalEmpresas, setModalEmpresas] = useState(false);
    const [modalUsuarios, setModalUsuarios] = useState(false);
    const [modalInstituciones, setModalInstituciones] = useState(false);
    const toggleEmpresas = () => setModalEmpresas(!modalEmpresas);
    const toggleUsuarios = () => setModalUsuarios(!modalUsuarios);
    const toggleInstituciones = () => setModalUsuarios(!modalInstituciones);

    const handleVerEmpresas = () => navigate(`/admin/consola/listaEmpresas/${id}`);
    const handleVerEmpresasExternas = () => navigate(`/admin/consola/listaEmpresasExternas/${id}`);
    const handleVerUsuarios = () => navigate(`/admin/consola/listaUsuarios/${id}`);
    const handleVerInstituciones = () => navigate(`/admin/consola/listaInstituciones/${id}`);
    const handleVerReportes = () => {
        navigate(`/admin/consola/moduloReportes/${id}`);
    };
    const handleVerPostulaciones = () => {
        navigate(`/admin/consola/listaPostulacionesAdmin/${id}`);
    };


    return (
        <div className="App">

            <TabsAdministracionComp />
            <Container fluid className="main-content">

                <Row className="justify-content-center">
          
                    <Col xs={12} sm={6} md={4} lg={3}>
                        {/* Card para Empresas */}
                        <Card onClick={handleVerEmpresas} className="text-center p-4">
                            <Card.Body>
                                <FaBuilding size={70} className="icono-empresa" />
                                <Card.Title>Empresas</Card.Title>
                                <Card.Text>Gestionar empresas.</Card.Text>
                                <Button variant="primary">Ver Empresas</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                 
                    <Col xs={12} sm={6} md={4} lg={3}>
                        {/* Card para Usuarios */}
                        <Card className="text-center p-4" onClick={handleVerUsuarios}>
                            <Card.Body>
                                <FaUsers size={70} className="icono-usuarios" />
                                <Card.Title>Usuarios</Card.Title>
                                <Card.Text>
                                    Gestionar usuarios.
                                </Card.Text>
                                <Button variant="primary" >Ver Usuarios</Button>
                            </Card.Body>
                        </Card>
                    </Col>
            
                    <Col xs={12} sm={6} md={4} lg={3}>
                        {/* Card para Usuarios */}
                        <Card className="text-center p-4" onClick={handleVerPostulaciones}>
                            <Card.Body>
                                <FaPaperPlane size={70} className="icono-reportes" />
                                <Card.Title>Empleos y Postulaciones </Card.Title>
                                <Card.Text>
                                    Ver Empleos
                                </Card.Text>
                                <Button variant="primary">Ver Empleos</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="justify-content-center">
   
                    <Col xs={12} sm={6} md={4} lg={3}>

                        <Card onClick={handleVerEmpresasExternas} className="text-center p-4">
                            <Card.Body>
                                <FaBuilding size={70} className="icono-empresa" />
                                <Card.Title>Empresas Extermas</Card.Title>
                                <Card.Text>Gestionar empresas Externas.</Card.Text>
                                <Button variant="primary">Ver Empresas Externas</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className="text-center p-4" onClick={handleVerInstituciones}>
                            <Card.Body>
                                <FaUniversity size={70} className="icono-instituciones" />
                                <Card.Title>Instituciones</Card.Title>
                                <Card.Text>
                                    Gestionar instituciones.
                                </Card.Text>
                                <Button variant="primary" >Ver Instituciones</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3}>
  
                        <Card className="text-center p-4" onClick={handleVerReportes}>
                            <Card.Body>
                                <FaChartBar size={70} className="icono-reportes" />
                                <Card.Title>Módulo de Reportes</Card.Title>
                                <Card.Text>
                                    Ver los reportes y estadísticas.
                                </Card.Text>
                                <Button variant="primary">Ver Reportes</Button>
                            </Card.Body>
                        </Card>
                    </Col>


                </Row>

            </Container>
            <Modal show={modalEmpresas} onHide={toggleEmpresas} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Lista de Empresas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListaEmpresas />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleEmpresas}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Usuarios */}
            <Modal show={modalUsuarios} onHide={toggleUsuarios} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Lista de Usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListaUsuarios />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleUsuarios}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Instituciones */}
            <Modal show={modalInstituciones} onHide={toggleInstituciones} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Lista de Instituciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListaInstituciones />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleInstituciones}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
};

export default Main;