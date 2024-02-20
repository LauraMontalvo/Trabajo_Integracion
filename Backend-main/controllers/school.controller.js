const School = require('../models/school.model');

module.exports.createSchool = (request, response) =>{
    
    const {nombreInstitucion,ubicacion} = request.body;
    console.log(request.body)
    School.create({
        nombreInstitucion,ubicacion
    })
        .then(School => response.json({insertedSchool: School, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllSchools = (_,response) =>{
    School.find({})
    .then(retrievedSchools => response.json(retrievedSchools))
    .catch(err => response.json(err))
}

module.exports.getSchool = (request, response) =>{
    School.findOne({_id: request.params.id})
    .then(School => response.json(School))
    .catch(err => response.json(err))
}

module.exports.updateSchool = (request, response) =>{
    School.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateSchool => response.json(updateSchool))
    .catch(err => response.json(err))
}

module.exports.deleteSchool = (request, response) =>{
    School.deleteOne({_id: request.params.id})
    .then(SchoolDeleted => response.json(SchoolDeleted))
    .catch(err => response.json(err))
}
