import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { faTrashAlt, faEdit, faBuilding, faInfoCircle, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import TabsAdministracionComp from "../../Components/Administracion/TabsAdministracionComp";
import "../../Styles/Lista.scss";
import "../../Styles/ListaEmpresa.scss"; // Asegúrate de que estos estilos son adecuados para tu diseño
import EditarEmpresaExterna from "../../Components/Administracion/EditarEmpresaExterna";

const ListaEmpresasExternas = () => {
  const [empresasExternas, setEmpresasExternas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [empresaExternaToEdit, setEmpresaExternaToEdit] = useState(null);
  const [empresaExternaToDelete, setEmpresaExternaToDelete] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [empresasExternasFiltradas, setEmpresasExternasFiltradas] = useState([]);
  const [empresaActualizada, setEmpresaActualizada] = useState(false);
  const [empresaToEdit, setEmpresaToEdit] = useState(null);
  useEffect(() => {
    axios.get('https://46wm6186-8000.use.devtunnels.ms/api/externalCompanies')
      .then(res => {
        const empresasOrdenadas = res.data.sort((a, b) => a.nombreEmpresa.localeCompare(b.nombreEmpresa));
        setEmpresasExternas(empresasOrdenadas);
        setEmpresasExternasFiltradas(empresasOrdenadas); // Inicializa con todas las empresas externas
      })
      .catch(err => console.error("Error al obtener empresas externas:", err));
  }, []);

  const handleFiltroNombreChange = (event) => {
    const query = event.target.value.toLowerCase();
    setFiltroNombre(query);
    const filtrados = empresasExternas.filter(empresa =>
      empresa.nombreEmpresa.toLowerCase().includes(query)
    );
    setEmpresasExternasFiltradas(filtrados);
  };
  const truncateUrl = (url) => {
    const maxChar = 30; // Máximo número de caracteres antes de truncar
    return url.length > maxChar ? `${url.substring(0, maxChar)}...` : url;
  };
  const prepareDelete = (empresa) => {
    setEmpresaExternaToDelete(empresa);
    setShowDeleteModal(true);
  };
  const handleEditClick = (empresa) => {
    setEmpresaExternaToEdit(empresa._id); // Almacena solo la ID de la empresa a editar
    setShowEditModal(true); // Muestra el modal de edición
};
  const deleteEmpresaExterna = () => {
    axios.delete(`https://46wm6186-8000.use.devtunnels.ms/api/externalCompany/${empresaExternaToDelete._id}`)
      .then(() => {
        setShowDeleteModal(false);
        setEmpresasExternas(empresasExternas.filter(empresa => empresa._id !== empresaExternaToDelete._id));
        setEmpresasExternasFiltradas(empresasExternasFiltradas.filter(empresa => empresa._id !== empresaExternaToDelete._id));
      })
      .catch(err => console.error("Error al eliminar empresa externa:", err));
  };

  const updateEmpresaInfo = (updatedEmpresaInfo) => {
    setEmpresasExternas({ ...updatedEmpresaInfo });
    setEmpresaActualizada(true);
  };


  return (
    <div className="App">
     <TabsAdministracionComp />

<Container fluid className="mt-4">
  <Row>
    <Col md={3} className="widget">
      <h4>Filtrar Empresas Externas</h4>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Buscar por nombre de empresa"
          value={filtroNombre}
          onChange={handleFiltroNombreChange}
        />
      </Form.Group>
    </Col>
    <Col md={9}>
      <strong>Total de Empresas Externas:</strong> {empresasExternasFiltradas.length}
      <Row>
        {empresasExternasFiltradas.map((empresa) => (
          <Col md={6} key={empresa._id} className="mb-3">
            <Card className="empresa-card">
              <Card.Body>
                <Card.Title>
                  <FontAwesomeIcon icon={faBuilding} className="me-2" />
                  {empresa.nombreEmpresa}
                </Card.Title>
                <Card.Text>
                  <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> {empresa.descripcionPublicacion}
                </Card.Text>
                <Card.Text>
          <FontAwesomeIcon icon={faLink} className="me-2" />
          <a href={empresa.url} target="_blank" rel="noopener noreferrer" title={empresa.url}>
            {truncateUrl(empresa.url)}
          </a>
        </Card.Text>
             

                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                      <FontAwesomeIcon icon={faEdit} className="text-primary mr-2" style={{ cursor: 'pointer', fontSize: '1.5em', marginRight: '15px' }} onClick={() => handleEditClick(empresa)} />
                      <FontAwesomeIcon icon={faTrashAlt}
                          className="text-danger"
                          style={{ cursor: 'pointer', fontSize: '1.5em' }}
                          onClick={() => prepareDelete(empresa)} />
                  </div>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  </Row>
</Container>


{showEditModal && empresaExternaToEdit && (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>Editar Empresa Externa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditarEmpresaExterna
              id={empresaToEdit?._id}
                onEmpresaUpdated={updateEmpresaInfo}
                closeEditModal={() => setShowEditModal(false)}
            />
        </Modal.Body>
    </Modal>
)}

      {/* Modal para confirmar eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar la empresa externa {empresaExternaToDelete?.nombreEmpresa}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={deleteEmpresaExterna}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaEmpresasExternas;
