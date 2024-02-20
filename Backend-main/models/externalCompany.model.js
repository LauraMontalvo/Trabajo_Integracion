const mongoose = require('mongoose');

const externalCompanySchema = new mongoose.Schema({   
    nombreEmpresa: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatoria']
    },
    descripcionPublicacion:{
        type: String,
        required: [true, 'La descripción de la Publicacion es obligatoria'],
    },
    url: {
        type: String,
        required: [true, 'El url es obligatorio']
    },
});

const externalCompany = mongoose.model('ExternalCompany', externalCompanySchema);
module.exports = externalCompany;