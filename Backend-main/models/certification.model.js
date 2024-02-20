const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({   
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    url: {
        type: String,
        required: [true, 'El url es obligatorio']
    },
    idUsuario: {
        type: String,
        required: [true, 'El idUsuario es obligatorio']
    },
    fechaExpedicion:{
        type: Date,
        required: [true, 'La fecha de Expedicion es obligatoria'],
    }
});

const Certification = mongoose.model('Certification', CertificationSchema);
module.exports = Certification;