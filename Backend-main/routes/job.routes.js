const  JobController = require('../controllers/job.controller');

module.exports = function(app){
    app.post('/api/job/new',  JobController.createJob);
    app.get('/api/jobs',  JobController.getAllJobs);
    app.get('/api/job/:id', JobController.getJob);
    app.put('/api/job/:id/', JobController.updateJob);
    app.delete('/api/job/:id',  JobController.deleteJob);
    app.get('/api/jobs/company/:id',  JobController.getCompanyJobs);
}