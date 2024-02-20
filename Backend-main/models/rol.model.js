const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({   
    nombreRol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

const Rol = mongoose.model('Rol', RolSchema);
module.exports = Rol;