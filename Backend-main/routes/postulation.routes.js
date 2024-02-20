const  PostulationController = require('../controllers/postulation.controller');

module.exports = function(app){
    app.post('/api/postulation/new',  PostulationController.createPostulation);
    app.get('/api/postulations',  PostulationController.getAllPostulations);
    app.get('/api/postulation/:id', PostulationController.getPostulation);
    app.put('/api/postulation/:id/', PostulationController.updatePostulation);
    app.delete('/api/postulation/:id',  PostulationController.deletePostulation);
    app.get('/api/postulations/user/:id',  PostulationController.getUserPostulations);
    app.get('/api/postulations/job/:id',  PostulationController.getJobPostulations);
}