const Certification = require('../models/certification.model');

module.exports.createCertification = (request, response) =>{
    
    const {titulo, url,idUsuario, fechaExpedicion} = request.body;
    console.log(request.body)
    Certification.create({
        titulo, url,idUsuario, fechaExpedicion
    })
        .then(Certification => response.json({insertedCertification: Certification, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllCertifications = (_,response) =>{
    Certification.find({})
    .then(retrievedCertifications => response.json(retrievedCertifications))
    .catch(err => response.json(err))
}

module.exports.getCertification = (request, response) =>{
    Certification.findOne({_id: request.params.id})
    .then(Certification => response.json(Certification))
    .catch(err => response.json(err))
}

module.exports.updateCertification = (request, response) =>{
    Certification.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateCertification => response.json(updateCertification))
    .catch(err => response.json(err))
}

module.exports.deleteCertification = (request, response) =>{
    Certification.deleteOne({_id: request.params.id})
    .then(CertificationDeleted => response.json(CertificationDeleted))
    .catch(err => response.json(err))
}

module.exports.getUserCertifications = (request,response) =>{
    Certification.find({idUsuario: request.params.id})
    .then(retrievedCertifications => response.json(retrievedCertifications))
    .catch(err => response.json(err))
}