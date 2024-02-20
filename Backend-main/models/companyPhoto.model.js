const mongoose = require('mongoose');

const CompanyPhotoSchema = new mongoose.Schema({
    foto: {
        type: String,
        default: ''
    },
    ruta: {
        type: String,
        default: ''
    },
    idEmpresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
});

const CompanyPhoto = mongoose.model('CompanyPhoto', CompanyPhotoSchema);
module.exports = CompanyPhoto;
