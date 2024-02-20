const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({   
    estado:{
        type: String,
        
    },
    idEmpresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now
      },
    puesto: {
        type: String,
        required: [true, 'El puesto es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    formacionAcademica: {
        type: String,
        required: [true, 'La formacion Academica es obligatoria']
    },
    conocimientos: {
        type: String,
        required: [true, 'Los conocimientos requeridos son obligatorios']
    },
    aptitudes: {
        type: String,
        required: [true, 'Las aptitudes requeridos son obligatorias']
    },
    experiencia: {
        type: String,
        required: [true, 'La expriencia es obligatorias']
    },
    modalidad: {
        type: String,
        required: [true, 'La modalidad es obligatorio']
    },
});

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;