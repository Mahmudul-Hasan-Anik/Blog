const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    file:{
        type: String,
        required: true
    },
    para: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})


const BlogPost = mongoose.model('blog', BlogPostSchema)
module.exports = BlogPost