const Job = require('../models/job.model');
const Company = require('../models/company.model'); // Asegúrate de que este modelo esté correctamente definido

const Postulation = require('../models/postulation.model');
module.exports.createJob = (request, response) =>{
    const {idEmpresa, puesto,descripcion, formacionAcademica,conocimientos,aptitudes, estado,experiencia,modalidad} = request.body;
    console.log(request.body)
    Job.create({
idEmpresa, puesto,descripcion, formacionAcademica,conocimientos,aptitudes, estado,experiencia,modalidad    })
    
        .then(Job => response.json({insertedJob: Job, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllJobs = (_, response) => {
    Job.find({})
        .populate('idEmpresa', 'nombreEmpresa direccion')
        .then(retrievedJobs => {
            console.log(retrievedJobs); // Imprime para diagnóstico
            response.json(retrievedJobs);
        })
        .catch(err => response.json(err));
};


module.exports.getJob = (request, response) =>{
    Job.findOne({_id: request.params.id})
    .then(Job => response.json(Job))
    .catch(err => response.json(err))
}

module.exports.updateJob = (request, response) =>{
    Job.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateJob => response.json(updateJob))
    .catch(err => response.json(err))
}

module.exports.deleteJob = async (request, response) => {
    try {
        const { id } = request.params;

        // Elimina el empleo
        await Job.deleteOne({ _id: id });

        // Elimina todas las postulaciones asociadas a ese empleo
        await Postulation.deleteMany({ idEmpleo: id });

        // Si quieres, también puedes eliminar otros datos relacionados aquí

        response.json({ msg: 'El empleo y sus postulaciones han sido eliminados' });
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
};
module.exports.getCompanyJobs = (request,response) =>{
    Job.find({idEmpresa: request.params.id})
    .then(retrievedCertifications => response.json(retrievedCertifications))
    .catch(err => response.json(err))
}
