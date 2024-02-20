const LogIn = require('../controllers/login.controller');

module.exports = function(app){
    app.post('/api/user/login',  LogIn.validateUser);
    app.post('/api/company/login',  LogIn.validateCompany);
}