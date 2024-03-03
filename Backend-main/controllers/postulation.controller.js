const Postulation = require('../models/postulation.model');

module.exports.createPostulation = (request, response) => {
    const { idUsuario, idEmpleo, estado ,estadoPostulacion,motivoRechazo} = request.body; 
    Postulation.create({
        idUsuario,
        idEmpleo,
        estado,estadoPostulacion,
        motivoRechazo,
        fechaPostulacion: new Date() // Establece la fecha actual 
    })
    .then(postulation => response.json({ insertedPostulation: postulation, msg: 'Successful creation' }))
    .catch(err => response.status(400).json(err));
};

module.exports.getAllPostulations = (_,response) =>{
    Postulation.find({})
    .then(retrievedPostulations => response.json(retrievedPostulations))
    .catch(err => response.json(err))
}

module.exports.getPostulation = (request, response) =>{
    Postulation.findOne({_id: request.params.id}).populate('idUsuario')
    .then(Postulation => response.json(Postulation))
    .catch(err => response.json(err))
}

module.exports.updatePostulation = (request, response) =>{
    Postulation.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updatePostulation => response.json(updatePostulation))
    .catch(err => response.json(err))
}

module.exports.deletePostulation = (request, response) =>{
    Postulation.deleteOne({_id: request.params.id})
    .then(PostulationDeleted => response.json(PostulationDeleted))
    .catch(err => response.json(err))
}

module.exports.getUserPostulations = (request, response) => {
    Postulation.find({ idUsuario: request.params.id })
        .populate({
            path: 'idEmpleo',
            populate: {
                path: 'idEmpresa',
                model: 'Company', 
                select: 'nombreEmpresa' // Selecciona solo el campo nombreEmpresa
            }
        })
        .then(postulaciones => response.json(postulaciones))
        .catch(err => response.json(err));
};

module.exports.getJobPostulations = (request,response) =>{
    Postulation.find({idEmpleo: request.params.id}).populate('idUsuario')
    .then(retrievedCertifications => response.json(retrievedCertifications))
    .catch(err => response.json(err))
}