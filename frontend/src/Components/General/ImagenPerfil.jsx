import React, { useState, useEffect } from 'react';
import { Button, Image, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import defaultImage from '../../img/imagenUsuarioDefecto.png';
import * as constantes from '../../Models/Constantes';

const ImagenPerfil = ({ id, userParam, isEditingParam, onPhotoUpdated }) => {
    const [imagen, setImagen] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(isEditingParam);
    const [user, setUser] = useState(userParam);
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

            const response = await axios.put(`${constantes.URL_EDITAR_U_OBTENER_FOTO_USUARIO}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
          

            if (response && response.data && response.data.mensaje) {
                
                setIsEditing(false);
            
                onPhotoUpdated();
            } else {
                console.error('Respuesta inesperada del servidor');
            }
            setUser({ foto: response.data.foto });
            setImagenPreview(response.data.foto); 
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
        const fetchProfileImage = async () => {
            if (user.foto) {
                setImagenPreview(user.foto);
            }
            try {
                const response = await axios.get(`${constantes.URL_EDITAR_U_OBTENER_FOTO_USUARIO}/${id}`);
                console.log(response.data)
                if (response.data && response.data.foto) {

                    setUser(prevUser => ({ ...prevUser, foto: response.data.foto }));
                }
            } catch (error) {
                console.error('Error al obtener la imagen del perfil:', error);
            }
        };

        fetchProfileImage();
    }, [id, user.foto]);

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
                    <Button variant="success" onClick={handleSaveClick} className="me-2">Guardar</Button>
                    <Button variant="secondary" onClick={handleCancelClick}>Cancelar</Button>
                    {error && <Alert variant="danger">{error}</Alert>}
                </div>
            ) : (
                <>
                    <Image src={user.foto || imagenPreview || defaultImage} alt="Foto de perfil" roundedCircle className="img-fluid" />
                    <FontAwesomeIcon icon={faCamera} className="camera-icon" onClick={handleEditClick} />
                </>
            )}
        </div>
    );
};

export default ImagenPerfil;