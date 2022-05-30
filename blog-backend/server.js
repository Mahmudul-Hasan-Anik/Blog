const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const AuthRouter = require('./routes/AuthRoutes')
const BlogRouter = require('./routes/BlogPostRoutes')
const app = express()
const path = require('path')

require('dotenv').config()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log('Database connected')
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/upload", express.static(path.join(__dirname, "uploads"))); 
app.use('/auth', AuthRouter)
app.use('/', BlogRouter)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, ()=>{
    console.log(`server running port: ${port}`)
})