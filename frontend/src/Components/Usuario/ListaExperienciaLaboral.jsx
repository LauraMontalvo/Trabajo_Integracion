import React, { useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ListaExperienciaLaboral = ({ experienciaLaboral, onEdit, onDelete, formatDate }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExperienceId, setSelectedExperienceId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedExperienceId(id);
        setShowDeleteModal(true); // Activa el modal
    };

    const handleConfirmDelete = () => {
        onDelete(selectedExperienceId); // Llama a la función de eliminar del componente padre
        setShowDeleteModal(false); // Cierra el modal
    };
    const format = (dateString) => {
        if (!dateString) {
            return 'No disponible';
          }
        
          // Ya que la fecha está en formato ISO, simplemente devuelve la parte de la fecha.
          return dateString.split('T')[0];
        };
    return (
        <div>
            {experienciaLaboral.length > 0 ? (
                <ListGroup className="empleos-lista">
                    <h3>Experiencia Laboral</h3>
                    {experienciaLaboral.map((experiencia, index) => (
                        <ListGroup.Item key={index} className="mt-4 border p-3 position-relative">
                            <strong >Puesto:</strong>
                            <p>{experiencia.puesto}</p>
                            <strong >Descripción de Responsabilidades:</strong>
                            <p>{experiencia.descripcionResponsabilidades}</p>
                            <strong >Ámbito Laboral/Departamento:</strong>
                            <p>{experiencia.ambitoLaboral}</p>
                            <strong >Empresa en la que trabajó:</strong>
                            <p> {experiencia.empresa}</p>
                      

                            <div className="empleo-detalle">
                                <span><strong>Fecha de inicio:</strong> {format(experiencia.fechaInicio)}</span>
                            </div>
                            <div className="empleo-detalle">
                                <span><strong>Fecha de fin:</strong> {format(experiencia.fechaFin)}</span>
                            </div>
                           
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <FontAwesomeIcon icon={faEdit} className="text-primary mr-2" style={{ cursor: 'pointer', fontSize: '1.5em', marginRight: '15px' }}
                                    onClick={() => onEdit(experiencia._id)}
                                />
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className="text-danger"
                                    style={{ cursor: 'pointer', fontSize: '1.5em' }}
                                    onClick={() => handleDeleteClick(experiencia._id)} // Activa la función para mostrar el modal
                                />
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p>No hay experiencia laboral publicada actualmente.</p>
            )}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar esta experiencia laboral?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ListaExperienciaLaboral;
