const CompanyController = require('../controllers/company.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'Imagenes/')); // Asegúrate de que esta carpeta existe en tu proyecto
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
module.exports = function(app){
    app.post('/api/company/new', CompanyController.createCompany);
    app.get('/api/companies', CompanyController.getAllCompanies);
    app.get('/api/company/:id',CompanyController.getCompany);
    app.put('/api/company/:id/',CompanyController.updateCompany);
    app.delete('/api/company/:id', CompanyController.deleteCompany);
    // ... tus otras rutas ...

app.put('/api/company/foto/:id', upload.single('foto'), CompanyController.addPhoto);
app.get('/api/company/foto/:id', CompanyController.getCompanyPhoto);

}