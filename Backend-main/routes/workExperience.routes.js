const WorkExperience = require('../controllers/workExperience.controller');

module.exports = function(app){
    app.post('/api/workExperience/new', WorkExperience.createWorkExperience);
    app.get('/api/workExperiences', WorkExperience.getAllWorkExperiences);
    app.get('/api/workExperience/:id',WorkExperience.getWorkExperience);
    app.put('/api/workExperience/:id/',WorkExperience.updateWorkExperience);
    app.delete('/api/workExperience/:id', WorkExperience.deleteWorkExperience);
    app.get('/api/workExperiences/user/:id', WorkExperience.getUserExperience);
}