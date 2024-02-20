const mongoose = require('mongoose');

const WorkExperienceSchema = new mongoose.Schema({   

    puesto: {
        type: String,
        required: [true, 'El puesto es obligatorio']
    },
    descripcionResponsabilidades: {
        type: String,
        required: [true, 'La descripcion de Responsabilidades es obligatoria']
    },
    ambitoLaboral: {
        type: String,
        required: [true, 'El ámbito laboral es obligatorio']
    },
    empresa: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio']
    },
    fechaInicio:{
        type: Date,
        required: [true, 'La fecha de Inicio es obligatoria'],
    },
    fechaFin:{
        type: Date,
        required: [true, 'La fecha de Fin es obligatoria'],
    },
    idUsuario:{
        type: String,
        required: [true, 'El idUsuario es obligatorio']
    }
});

const WorkExperience = mongoose.model('WorkExperience', WorkExperienceSchema);
module.exports = WorkExperience;