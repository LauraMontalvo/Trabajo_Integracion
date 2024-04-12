import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Accordion, Button, Modal, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import { Link } from 'react-router-dom';
import "../../Styles/Lista.scss";
import moment from 'moment';
import 'moment/locale/es'; // se importa el locale español
const BuscarEmpleo = () => {
    const [empleos, setEmpleos] = useState([]);
    const [postulacionesUsuario, setPostulacionesUsuario] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);

    const { id: idUsuario } = useParams();
    const { id } = useParams();
    useEffect(() => {
        const obtenerEmpleosYPostulaciones = async () => {
            try {
                const respuestaEmpleos = await axios.get('https://46wm6186-8000.use.devtunnels.ms/api/jobs');
                const empleosActivos = respuestaEmpleos.data.filter(empleo => empleo.estado === 'Activo');
               
               // Ordenar los empleos por fecha de publicación en orden descendente
               const empleosOrdenados = empleosActivos.sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion));
                
               const empleosConEmpresa = await Promise.all(
                   empleosOrdenados.map(async (empleo) => {
                       const resEmpresa = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/company/${empleo.idEmpresa}`);
                       return { ...empleo, nombreEmpresa: resEmpresa.data.nombreEmpresa };
                   })
               );
                setEmpleos(empleosConEmpresa);

                // Obtiene las postulaciones del usuario desde el servidor
                const respuestaPostulaciones = await axios.get(`https://46wm6186-8000.use.devtunnels.ms/api/postulations/user/${idUsuario}`);
                setPostulacionesUsuario(respuestaPostulaciones.data);
            } catch (error) {
                console.error('Error al obtener empleos o postulaciones:', error);
            }
        };

        obtenerEmpleosYPostulaciones();
    }, [idUsuario]);

    const yaPostulado = (idEmpleo) => {
        return postulacionesUsuario.some((postulacion) => postulacion.idEmpleo && postulacion.idEmpleo._id === idEmpleo);
    };


    const handlePostularseClick = (idEmpleo) => {
        setSelectedJobId(idEmpleo);
        setShowModal(true);
    };

    const confirmarPostulacion = async () => {
        try {
            const response = await axios.post('https://46wm6186-8000.use.devtunnels.ms/api/postulation/new', {
                idUsuario,
                idEmpleo: selectedJobId,
                estadoPostulacion: 'Activo',
                estado: 'En Espera',
            });

            // Actualiza el estado de postulaciones del usuario
            setPostulacionesUsuario((prevPostulaciones) => [
                ...prevPostulaciones,
                { ...response.data.insertedPostulation, idEmpleo: { _id: selectedJobId } },
            ]);

            setShowModal(false);
        } catch (error) {
            console.error('Error al realizar la postulación:', error);
        }
    };
    const moment = require('moment');
    moment.locale('es'); // Configura el idioma a español

    function formatRelativeDate(date) {
        return moment(date).fromNow();
    }
    return (
        <div className="App">
            <CabeceraUsuarioInicio />
            <Container fluid className="mt-4">
                <h2>Empleos Disponibles</h2>
                <Accordion defaultActiveKey="0" flush>
                    {empleos.map((empleo, index) => {
                        if (!empleo || !empleo._id) {
                            return null;
                        }
                        return (

                            <Accordion.Item eventKey={index.toString()} key={empleo._id}>
                                <Card className="card-custom">
                                    <Accordion.Header >
                                        <div>
                                            <p className="publication-date">Publicado {formatRelativeDate(empleo.fechaPublicacion)}</p>
                                            Empleo en  <Link to={`/perfilEmpresa/${id}/${empleo.idEmpresa._id}`} className="empresa-link">
                                                {empleo.idEmpresa?.nombreEmpresa || "Empresa no especificada"}
                                            </Link>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <strong >Puesto:</strong>
                                        <p>{empleo.puesto}</p>
                                        <strong >Descripción:</strong>
                                        <p>{empleo.descripcion}</p>
                                        <strong >Formación Académica:</strong>
                                        <p>{empleo.formacionAcademica}</p>
                                        <strong>Conocimientos Requeridos:</strong>
                                        <p>{empleo.conocimientos}</p>
                                        <strong>Experiencia Requerida:</strong>
                                        <p>{empleo.experiencia}</p>
                                        <strong>Aptitudes Necesarias:</strong>
                                        <p>{empleo.aptitudes}</p>
                                        <strong>Modalidad:</strong> <p>{empleo.modalidad}</p>
                                        <div>
                                            {yaPostulado(empleo._id) ? (
                                                <Button variant="secondary" disabled>Ya Postulado</Button>
                                            ) : (
                                                <Button variant="primary" onClick={() => handlePostularseClick(empleo._id)}>
                                                    <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                                                    Postularse
                                                </Button>
                                            )}
                                        </div>
                                    </Accordion.Body>
                                </Card>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Postulación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Estás seguro de que quieres postularte al empleo que ofrece {
                            (empleos.find(e => e && e._id === selectedJobId) || {}).idEmpresa?.nombreEmpresa || "Empresa no especificada"
                        }?
                    </Modal.Body>                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={confirmarPostulacion}>
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default BuscarEmpleo;
