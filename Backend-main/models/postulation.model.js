const mongoose = require('mongoose');

const PostulationSchema = new mongoose.Schema({   
    
    estadoPostulacion:{
        type: String,
        
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El idUsuario es obligatorio']
    },
    idEmpleo: {
        type: mongoose.Schema.Types.ObjectId, // Cambia a ObjectId
        ref: 'Job',
        required: [true, 'El idEmpleo es obligatorio']
    },
    estado:{
        type: String,
        required: [true, 'El El idUsuario es obligatorio'],
    },
    motivoRechazo:{
        type: String,
    },
    fechaPostulacion:{
        type: Date,
        required: [true, 'La fecha de postulación es obligatoria'],
    }
});

const Postulation = mongoose.model('Postulation', PostulationSchema);
module.exports = Postulation;