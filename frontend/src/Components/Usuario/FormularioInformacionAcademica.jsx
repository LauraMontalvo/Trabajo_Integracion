import React from 'react';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const FormularioInformacionAcademica = ({ showAcadTrainingModal, handleCloseAcadTrainingModal, handleAddAcadTraining, tituloObtenido, setTituloObtenido, institucion, setInstitucion, fechaInicio, setFechaInicio, fechaFin, setFechaFin, instituciones, editingAcadTrainingId, tituloObtenidoError, institucionError, fechaInicioError, fechaFinError }) => {
  return (
    <Modal show={showAcadTrainingModal} onHide={handleCloseAcadTrainingModal}>
      <Modal.Header closeButton>
        <Modal.Title className='tituloModal'>{editingAcadTrainingId ? 'Editar' : 'Agregar'} Información Académica</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mi-formulario">
          <Form.Group controlId="formTitulo">
            <Form.Label>Título obtenido</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faGraduationCap} className="input-icon" />
              <Form.Control
                type="text"
                placeholder="Ingrese el título obtenido"
                value={tituloObtenido}
                onChange={(e) => setTituloObtenido(e.target.value)}
                className="input-with-icon" />
            </div>
            {tituloObtenidoError && <p className="text-danger">{tituloObtenidoError}</p>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Institución</Form.Label>
            <div className="input-icon-wrapper-select">
              <Select
                isCreatable
                onChange={setInstitucion}
                options={instituciones.map(institucion => ({
                  label: institucion.nombreInstitucion,
                  value: institucion._id
                }))}
                value={institucion}
                placeholder="Seleccionar institución"
                formatCreateLabel={(inputValue) => `Crear "${inputValue}"`}
              />
            </div>
            {institucionError && <p className="text-danger">{institucionError}</p>}
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Fecha de inicio</Form.Label>
                <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                  <Form.Control
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="input-with-icon" />
                </div>
                {fechaInicioError && <p className="text-danger">{fechaInicioError}</p>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Fecha de fin</Form.Label>
                <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                  <Form.Control
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="input-with-icon" />
                </div>
                {fechaFinError && <p className="text-danger">{fechaFinError}</p>}
              </Form.Group>
            </Col>
          </Row>

          <div className='botones-centrados'>
            <Button variant="secondary" onClick={handleCloseAcadTrainingModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleAddAcadTraining}>
              {editingAcadTrainingId ? 'Guardar Cambios' : 'Agregar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioInformacionAcademica;
