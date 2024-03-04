const User = require('../models/user.model');
const UserPhoto = require('../models/userPhoto.model');
const fs = require('fs').promises; // Asegúrate de importar la versión de promesas de fs
const AcadTraining = require('../models/acadTraining.model');
const Certification = require('../models/certification.model');
const WorkExperience = require('../models/workExperience.model');
const Postulation = require('../models/postulation.model');
module.exports.createUser = (request, response) => {
    const { nombre, apellido, rol, sexo, fechaNacimiento, telefono, usuario, descripcionPersonal, estado,password, confirmPassword } = request.body;
    User.findOne({ usuario: usuario })
        .then(user => {
            if (user) {
                response.status(400).json({ msg: "Usuario existe" });
            } else {
                User.create({
                    nombre, apellido, rol, sexo, fechaNacimiento, telefono, usuario, descripcionPersonal,estado,password, confirmPassword
                })
                    .then(User => response.json({ insertedUser: User, msg: 'Succesful creation' }))
                    .catch(err => response.status(400).json(err));
            }
        })
        .catch(err => response.json(err))
}

module.exports.getAllUsers = (_, response) => {
    User.find({})
        .then(async retrievedUsers => {
            // Busca y adjunta la URL de la foto a cada usuario
            const usersWithPhotos = await Promise.all(retrievedUsers.map(async user => {
                const userPhoto = await UserPhoto.findOne({ idUsuario: user._id });
                const photoUrl = userPhoto ? `https://46wm6186-8000.use.devtunnels.ms/Imagenes/${userPhoto.foto}` : null;
                return { ...user.toObject(), foto: photoUrl };
            }));
            response.json(usersWithPhotos);
        })
        .catch(err => response.json(err));
}
module.exports.getUser = (request, response) => {
    User.findOne({ _id: request.params.id })
        .then(User => response.json(User))
        .catch(err => response.json(err))
}

module.exports.getUserByUsername = (request, response) => {
    User.findOne({ _id: request.params.usuario })
        .then(User => response.json(User))
        .catch(err => response.json(err))
}

module.exports.updateUser = (request, response) => {
    const userId = request.params.id;
    const { usuario } = request.body;

    // Primero, verifica si el nombre de usuario ya está tomado por otro usuario
    User.findOne({ usuario: usuario, _id: { $ne: userId } })
        .then(user => {
            if (user) {
                // Usuario encontrado con el mismo nombre de usuario pero diferente ID
                return response.status(400).json({ msg: "El nombre de usuario ya está en uso." });
            } else {
                // Actualiza el usuario si el nombre de usuario no está tomado
                User.findOneAndUpdate({ _id: userId }, request.body, { new: true })
                    .then(updateUser => response.json(updateUser))
                    .catch(err => response.status(400).json(err));
            }
        })
        .catch(err => response.status(400).json(err));
};
module.exports.deleteUser = (request, response) => {
    const userId = request.params.id;

    // Primero, elimina los registros relacionados
    Promise.all([
        AcadTraining.deleteMany({ idUsuario: userId }).exec(),
        Certification.deleteMany({ idUsuario: userId }).exec(),
        WorkExperience.deleteMany({ idUsuario: userId }).exec(),
        UserPhoto.deleteMany({ idUsuario: userId }).exec(),
        Postulation.deleteMany({ idUsuario: userId }).exec(),
        // Añade aquí otras operaciones de eliminación para modelos relacionados
    ])
    .then(() => {
        // Ahora elimina el usuario
        return User.deleteOne({ _id: userId }).exec();
    })
    .then(() => {
        response.json({ message: "Usuario y datos relacionados eliminados correctamente." });
    })
    .catch(err => {
        response.status(500).json({ error: err.message });
    });
};

module.exports.addPhoto = async (request, response) => {
    if (!request.file) {
        return response.status(400).json({ error: 'No se ha enviado ningún archivo.' });
    }

    const nuevaFoto = {
        foto: request.file.filename,
        ruta: 'Imagenes/' + request.file.filename,
        idUsuario: request.params.id
    };

    try {
        const fotoUsuario = await UserPhoto.findOne({ idUsuario: request.params.id });

        if (fotoUsuario) {
            // Elimina la foto anterior si existe
            const oldFilePath = fotoUsuario.ruta;
            try {
                await fs.unlink(oldFilePath);
            } catch (error) {
                console.warn("Error al eliminar la imagen anterior:", error.message);
            }

            fotoUsuario.foto = nuevaFoto.foto;
            fotoUsuario.ruta = nuevaFoto.ruta;
            await fotoUsuario.save();
        } else {
            await UserPhoto.create(nuevaFoto);
        }

        const imageUrl = `https://46wm6186-8000.use.devtunnels.ms/${nuevaFoto.ruta}`; // Construye la URL de la imagen

        return response.json({ mensaje: 'Foto agregada exitosamente', foto: imageUrl });
    } catch (error) {
        console.error('Error al agregar la foto:', error);
        if (error.status) {
            return response.status(error.status).json({ error: error.message });
        } else {
            return response.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports.getUserPhoto = (request, response) => {
    UserPhoto.findOne({idUsuario: request.params.id})
        .then(user => {
            if (!user) {
                return response.status(404).json({ error: 'Usuario no encontrado.' });
            }
       
            const imageUrl = user.foto ? `https://46wm6186-8000.use.devtunnels.ms/Imagenes/${user.foto}` : null;
            response.json({ foto: imageUrl });
        })
        .catch(error => {
            console.error('Error al obtener la foto del usuario:', error);
            response.status(500).json({ error: 'Error interno del servidor' });
        });
};
