const express = require('express')
const Auth = require('../Models/AuthModel')
const bcrypt = require('bcrypt');


const AuthRouter = express.Router()

AuthRouter.post('/registration', (req,res)=>{
    const newAuth = new Auth({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })

    newAuth.save().then(()=>{
        res.status(200).json({msg:'Data send successful'})
    }).catch((err)=>{
        res.status(400).json({msg: 'Data send Failed'})
    })
})


AuthRouter.post('/login', async(req,res)=>{
    const loginAuth = await Auth.findOne({email: req.body.email})

    if(loginAuth){
        if(bcrypt.compareSync(req.body.password, loginAuth.password)){
            console.log("ami ahsi")
            res.send({
                _id: loginAuth.id,
                name: loginAuth.name,
                email: loginAuth.email
            })
            return
        }else{
            res.status(400).json({msg:'Password not match'})
        }
    }
})


module.exports = AuthRouter


//MAYBE THERE A ERROR