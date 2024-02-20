const SchoolController = require('../controllers/school.controller');

module.exports = function(app){
    app.post('/api/school/new', SchoolController.createSchool);
    app.get('/api/schools', SchoolController.getAllSchools);
    app.get('/api/school/:id',SchoolController.getSchool);
    app.put('/api/school/:id/',SchoolController.updateSchool);
    app.delete('/api/school/:id', SchoolController.deleteSchool);
}