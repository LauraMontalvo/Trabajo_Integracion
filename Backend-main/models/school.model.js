const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({   
    nombreInstitucion: {
        type: String,
        required: [true, 'El nombre de la Institucion es obligatoria']
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicacion es obligatoria']
    }
    
    
});

const School = mongoose.model('School', SchoolSchema);
module.exports = School;
