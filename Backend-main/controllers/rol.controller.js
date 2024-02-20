const Rol = require('../models/rol.model');

module.exports.createRol = (request, response) =>{
    
    const {nombreRol} = request.body;
    console.log(request.body)
    Rol.create({
        nombreRol
    })
        .then(Rol => response.json({insertedRol: Rol, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllRoles = (_,response) =>{
    Rol.find({})
    .then(retrievedRoles => response.json(retrievedRoles))
    .catch(err => response.json(err))
}

module.exports.getRol = (request, response) =>{
    Rol.findOne({_id: request.params.id})
    .then(Rol => response.json(Rol))
    .catch(err => response.json(err))
}

module.exports.updateRol = (request, response) =>{
    Rol.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateRol => response.json(updateRol))
    .catch(err => response.json(err))
}

module.exports.deleteRol = (request, response) =>{
    Rol.deleteOne({_id: request.params.id})
    .then(RolDeleted => response.json(RolDeleted))
    .catch(err => response.json(err))
}
