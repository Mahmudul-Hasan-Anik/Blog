const express = require('express')
const BlogPost = require('../Models/BlogPostModel')
const multer  = require('multer')
const path = require('path')
const BlogRouter = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname
                             .replace(fileExt, '')
                             .split(' ')
                             .join('-') + '-' + Date.now()

        cb(null, fileName + fileExt)
    }
})

const upload = multer({ 
    storage: storage,
    limits:{
        fieldSize: 2000000 // 2MB
    },
    fileFilter: (req, file, cb)=>{
        if(
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ){
            cb(null, true)
        }else{
            cb(new Error('Only png, jpg and jpeg format allowed'))
        }
    } 
})



BlogRouter.post('/blogPost',upload.single('image-file'), async(req,res)=>{
    // const frontEndData = JSON.parse(JSON.stringify(req.body))
    const url = req.protocol + "://" + req.get("host");
    const img = url + "/upload/" + req.file.filename;

    console.log(req.protocol, 'pro')
    console.log(req.get('host'))

    const newBlog = new BlogPost({
       title: req.body.title,
       file: img,
       para: req.body.para,
    })
     await newBlog.save().then(()=>{
        res.status(200).json({msg:'Data send Successful'})
    }).catch((err)=>{
        res.status(400).json({msg:'Data send failed'})
    })
})

BlogRouter.get('/blog/data', (req,res)=>{
    BlogPost.find({}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json(err)
        }
    })
})

module.exports = BlogRouter

