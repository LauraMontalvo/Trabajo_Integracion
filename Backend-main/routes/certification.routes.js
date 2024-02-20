const CertificationController = require('../controllers/certification.controller');

module.exports = function(app){
    app.post('/api/certification/new', CertificationController.createCertification);
    app.get('/api/certifications', CertificationController.getAllCertifications);
    app.get('/api/certification/:id',CertificationController.getCertification);
    app.put('/api/certification/:id/',CertificationController.updateCertification);
    app.delete('/api/certification/:id', CertificationController.deleteCertification);
    app.get('/api/certification/user/:id', CertificationController.getUserCertifications);
}