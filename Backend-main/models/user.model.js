const mongoose = require('mongoose');
const md5 = require('md5');


const UserSchema = new mongoose.Schema({   

    estado:{
        type: String,
        
    },
    foto:{
        type: String,
        
    },
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    apellido:{
        type: String,
        required: [true, 'El apellido es obligatorio'],
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    sexo: {
        type: String,
        required: [true, 'El genero es obligatorio']
    },
    fechaNacimiento:{
        type: Date,
        required: [true, 'La fecha de Nacimiento es obligatoria'],
    },
    telefono: {
        type: String,
        required: [true, 'El número telefono es obligatorio'],
    },
    descripcionPersonal:{
        type: String,
        
    },
    usuario:{
        type: String,
        required: [true, 'El usuario es obligatorio'],
    },
    password: {
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

}, );




UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    console.log(this.password ,this.confirmPassword)
    if (this.password != this.confirmPassword) {
    this.invalidate('confirmPassword', 'Contraseña debe coincidir con!');
    }
    next();
    });


UserSchema.pre('save', function(next) {
    this.password = md5(this.password);
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;