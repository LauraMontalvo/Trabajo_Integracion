const externalCompany = require('../models/externalCompany.model');

module.exports.createExternalCompany = (request, response) =>{
    
    const {nombreEmpresa, descripcionPublicacion, url} = request.body;
    console.log(request.body)
    externalCompany.create({
        nombreEmpresa, descripcionPublicacion, url
    })
        .then(externalCompany => response.json({insertedExternalCompany: externalCompany, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllExternalCompanies = (_,response) =>{
    externalCompany.find({})
    .then(retrievedExternalCompanies => response.json(retrievedExternalCompanies))
    .catch(err => response.json(err))
}

module.exports.getExternalCompany = (request, response) =>{
    externalCompany.findOne({_id: request.params.id})
    .then(externalCompany => response.json(externalCompany))
    .catch(err => response.json(err))
}

module.exports.updateExternalCompany = (request, response) =>{
    externalCompany.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateExternalCompany => response.json(updateExternalCompany))
    .catch(err => response.json(err))
}

module.exports.deleteExternalCompany = (request, response) =>{
    externalCompany.deleteOne({_id: request.params.id})
    .then(DeletedExternalCompany => response.json(DeletedExternalCompany))
    .catch(err => response.json(err))
}
