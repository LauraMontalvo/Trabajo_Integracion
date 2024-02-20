const ExternalCompanyController = require('../controllers/externalCompany.controller');

module.exports = function(app){
    app.post('/api/externalCompany/new', ExternalCompanyController.createExternalCompany);
    app.get('/api/externalCompanies', ExternalCompanyController.getAllExternalCompanies);
    app.get('/api/externalCompany/:id',ExternalCompanyController.getExternalCompany);
    app.put('/api/externalCompany/:id/',ExternalCompanyController.updateExternalCompany);
    app.delete('/api/externalCompany/:id', ExternalCompanyController.deleteExternalCompany);
}