const UserController = require('../controllers/user.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'Imagenes/')); 
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = function(app){
    app.post('/api/user/new', UserController.createUser);
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/user/:id',UserController.getUser);
    app.put('/api/user/:id/',UserController.updateUser);
    app.delete('/api/user/:id', UserController.deleteUser);
    app.put('/api/user/foto/:id', upload.single('foto'), UserController.addPhoto);
    app.get('/api/user/foto/:id', UserController.getUserPhoto);
}