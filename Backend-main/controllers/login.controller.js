const User = require('../models/user.model');
const Company = require('../models/company.model');

const md5 = require('md5'); // Importa la biblioteca md5

// ...

module.exports.validateUser = (req, res) => {
    User.findOne({ usuario: req.body.usuario })
        .then((user) => {
            if (user) {
                // Verificar si el usuario está activo
                if (user.estado !== 'Activo') {
                    return res.json({ msg: 'Esta cuenta esta bloqueada.Por favor, contacte al administrador.' });
                }
                // Hashea la contraseña de entrada
                const hashedPassword = req.body.password;
                if (hashedPassword === user.password) {
                    res.json({
                        msg: 'Usuario validado correctamente!!',
                        user: user
                    });
                } 
            } else {
                res.json({ msg: 'El usuario o la Contraseña son incorrectos' });
            }
        })
        .catch(err => res.json({ err: err, msg: "Error al validar el usuario." }));
}


module.exports.validateCompany = (req, res) => {
    Company.findOne({ usuario: req.body.usuario })
        .then((company) => {
            if (company) {
                if (company.estado !== 'Activo') {
                    return res.json({ msg: 'Esta cuenta esta bloqueada.Por favor, contacte al administrador.' });
                }
                // Hashea la contraseña de entrada
                const hashedPassword = (req.body.password);
                if (hashedPassword === company.password) {
                    res.json({
                        msg: 'Empresa validada correctamente!!',
                        user: company
                    });
                } 
            } else {
                res.json({ msg: 'El usuario o la Contraseña son incorrectos' });
            }
        })
        .catch(err => res.json({ err: err, msg: "Error al validar la empresa." }));
}



