const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AuthSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const Auth = mongoose.model('auth', AuthSchema)
module.exports = Auth