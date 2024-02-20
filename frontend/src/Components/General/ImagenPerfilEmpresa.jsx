import React, { useState, useEffect } from 'react';
import { Button, Image, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import defaultImage from '../../img/imagenUsuarioDefecto.png';
import * as constantes from '../../Models/Constantes'

const ImagenEmpresa = ({ id, empresaParam, isEditingParam }) => {
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(isEditingParam);
  const [empresa, setEmpresa] = useState(empresaParam);
  const [error, setError] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png") && file.size <= 4096000) {
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
      setError('');
    } else {
      setError('Por favor, selecciona una imagen (JPG o PNG) que sea menor a 4MB.');
    }
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('foto', imagen);

      const response = await axios.put(`${constantes.URL_EDITAR_U_OBTENER_FOTO_EMPRESA}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setEmpresa({ foto: response.data.foto });
      setIsEditing(false);
    } catch (error) {
      console.error('Error al subir la imagen:', error.response.data.error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setImagen(null);
    setImagenPreview(null);
    setError('');
  };

  useEffect(() => {
    const fetchCompanyImage = async () => {

      try {
        const response = await axios.get(`${constantes.URL_EDITAR_U_OBTENER_FOTO_EMPRESA}/${id}`);
        if (response.data && response.data.foto) {
          setEmpresa(prevEmpresa => ({ ...prevEmpresa, foto: response.data.foto }));
        }
      } catch (error) {
        console.error('Error al obtener la imagen de la empresa:', error);
      }
    };

    fetchCompanyImage();
  }, [id]);

  return (
    <div className="image-container text-center mb-3">
      {isEditing ? (
        <div>
          <InputGroup className="mb-3">
            <FormControl
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              aria-label="Upload"
              aria-describedby="upload-button"
            />
            <Button variant="outline-secondary" id="upload-button" onClick={handleSaveClick}>
              <FontAwesomeIcon icon={faUpload} />
            </Button>
          </InputGroup>
          {imagenPreview && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image src={imagenPreview} alt="Vista previa de la imagen" roundedCircle className="img-fluid mb-3" />
            </div>
          )}
          <Button variant="success" onClick={handleSaveClick} className="me-2">
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleCancelClick}>
            Cancelar
          </Button>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
      ) : (
        <>
          <Image src={empresa.foto || imagenPreview || defaultImage} alt="Foto de empresa" roundedCircle className="img-fluid" />
          <FontAwesomeIcon icon={faCamera} className="camera-icon" onClick={handleEditClick} />
        </>
      )}
    </div>
  );
};

export default ImagenEmpresa;
