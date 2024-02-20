import React from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListaInformacionAcademica = ({ acadTraining, handleShowAcadTrainingModal, handleShowDeleteModal }) => {
 
  const format = (dateString) => {
    if (!dateString) {
        return 'No disponible';
      }
    
      // Ya que la fecha está en formato ISO, simplemente devuelve la parte de la fecha.
      return dateString.split('T')[0];
    };
  return (
    <ListGroup className="empleos-lista" variant="flush">
      <h3>Información Académica</h3>
      {acadTraining.map((item) => (
        <ListGroup.Item key={item._id} className="mt-4 border p-3 position-relative">
          <div className="empleo-detalle">
            <span><strong>Título obtenido:</strong> {item.tituloObtenido}</span>
          </div>
          <div className="empleo-detalle">
            <span><strong>Institución:</strong> {item.idInstitucion?.nombreInstitucion || 'No disponible'}</span>
          </div>
         <div className="empleo-detalle">
            <span><strong>Ubicación de la Institución:</strong> {item.idInstitucion?.ubicacion || 'No disponible'}</span>
          </div>
          <div className="empleo-detalle">
            <span><strong>Fecha de inicio:</strong> {format(item.fechaInicio)}</span>
           
          </div>
          <div className="empleo-detalle">
            <span><strong>Fecha de fin:</strong>{format(item.fechaFin)}</span>
          </div>

          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <FontAwesomeIcon icon={faEdit} onClick={() => handleShowAcadTrainingModal(item._id)} className="text-primary mr-2" style={{ cursor: 'pointer', fontSize: '1.5em', marginRight: '15px' }} />
            <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleShowDeleteModal(item._id)} className="text-danger" style={{ cursor: 'pointer', fontSize: '1.5em' }} />
          </div>
        </ListGroup.Item>
      ))}

    </ListGroup>
  );
};

export default ListaInformacionAcademica;