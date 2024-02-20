const AcadTrainingController = require('../controllers/acadTraining.controller');

module.exports = function(app){
    app.post('/api/acadTraining/new', AcadTrainingController.createAcadTraining);
    app.get('/api/acadTrainings', AcadTrainingController.getAllAcadTrainings);
    app.get('/api/acadTraining/:id',AcadTrainingController.getAcadTraining);
    app.put('/api/acadTraining/:id/',AcadTrainingController.updateAcadTraining);
    app.delete('/api/acadTraining/:id', AcadTrainingController.deleteAcadTraining);
    app.get('/api/acadTrainings/user/:id', AcadTrainingController.getUserAcadTraining);
    app.get('/api/acadTrainings/school/:id', AcadTrainingController.getSchoolAcadTraining);

}