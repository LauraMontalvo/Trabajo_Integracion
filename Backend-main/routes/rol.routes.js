const RolController = require('../controllers/rol.controller');

module.exports = function(app){
    app.post('/api/rol/new', RolController.createRol);
    app.get('/api/roles', RolController.getAllRoles);
    app.get('/api/rol/:id',RolController.getRol);
    app.put('/api/rol/:id/',RolController.updateRol);
    app.delete('/api/rol/:id', RolController.deleteRol);
}