const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoDb = require('./database/db')
const bookRoute = require('./routes/book.routes')

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://narudon:Nd-0620682282@cluster0.m4q1btw.mongodb.net/?retryWrites=true&w=majority'
).then(()=>{
    console.log('Database successfully connected');
},error =>{
    console.log('Database error:'+error);
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(cors())

/// Static directory path
app.use(express.static(path.join(__dirname,'dist/')))


/// Base route
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname),'dist/index.html')
})

app.use('/api',bookRoute)

//PORT
const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log("listening on port" + port);
})

// app.use((req,res,next)=>{
//     next(createError(404))
// })

// app.use((err,req,res,next)=>{
//     console.error(err.message)
//     if(!err.statusCode) err.statusCode = 500
//     res.static(err.statusCode).send(err.message)
// })
