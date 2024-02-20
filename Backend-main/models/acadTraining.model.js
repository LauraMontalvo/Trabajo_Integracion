const mongoose = require('mongoose');


const AcadTrainingSchema = new mongoose.Schema({   
    idInstitucion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School', 
        required: [true, 'El campo school es obligatorio']
    },
    idUsuario: {
        type: String,
        required: [true, 'El idUsuario es obligatorio']
    },
    tituloObtenido:{
        type: String,
        required: [true, 'El tiitulo obtenido es obligatorio']
    },
    fechaInicio:{
        type: Date,
        required: [true, 'La fecha de Inicio es obligatoria'],
    },
    fechaFin:{
        type: Date,
        required: [true, 'La fecha de Fin es obligatoria'],
    }
});

const AcadTraining = mongoose.model('AcadTraining', AcadTrainingSchema);
module.exports = AcadTraining; 