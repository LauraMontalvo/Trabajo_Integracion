const mongoose = require('mongoose');
const md5 = require('md5');
const CompanySchema = new mongoose.Schema({   
    estado:{
        type: String,
        
    },
    foto:{
        type: String,
        
    },
    nombreEmpresa:{
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio'],
    },
    correo:{
        type: String,
        required: [true, "Correo electronico es requerido"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), 
            message: "Correo invalido"
        }
    },
    direccion:{
        type: String,
        required: [true, 'La direccion es obligatoria'],
    },
    telefono:{
        type: String,
        required: [true, 'El número telefono es obligatorio'],
    },
    descripcion:{
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    valores:{
        type: String,
        
    },
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio'],
    },
    usuario:{
        type: String,
        required: [true, 'El usuario es obligatorio'],
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        validate: {
          validator: function (value) {
            // Utilizar una expresión regular para validar la contraseña
            return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value);
          },
          message:
            'La contraseña debe contener al menos una mayúscula, un número y un carácter especial',
        },
    },
    
});

CompanySchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

CompanySchema.pre('validate', function(next) {
    console.log(this.password ,this.confirmPassword)
    if (this.password != this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match!');
    }
    next();
    });


    CompanySchema.pre('save', function(next) {
        this.password = md5(this.password);
        next();
    });
    

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;