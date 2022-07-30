
const express = require("express")
const app = express()
const PORT = 3500
require('dotenv').config()  
const { default: mongoose } = require('mongoose')
const Todos = require("./models/todotasks")
const morgan = require('morgan')

//view engine
app.set("view engine", "ejs")

//connect to db and listen in
mongoose.connect(process.env.dburi, {useNewUrlparser:true, useUnifiedTopology: true})
.then((result) => app.listen(PORT), console.log('connected to db'))
.catch((err) => console.log(err))


//middleware 
app.use(express.static('public'))    
app.use(express.urlencoded({extended: true})) 
app.use(morgan('dev'))



//routes
app.get('/', (req, res) => {
        Todos.find()
        .then(result => {
            res.render('index.ejs', {todoTask:result})
        })
        .catch(err => {
            console.log(err)
        })
    })

app.post('/', (req, res) => {
    console.log(req.body)
    const todoTask = new Todos({
        title: req.body.title,
        content: req.body.content
    })
    todoTask.save()
    .then(result => {
        res.redirect('/');
      })
    .catch(err => {
        console.log(err)
    })
    })

app
    .route("/edit/:id")
    .get((req,res) => {
    const id = req.params.id;

    Todos.find()
    .then(result => {
        res.render('edit.ejs',{
            todoTask: result, idTask: id})
    })
})
    .post((req,res) => {
        const id =req.params.id
        Todos.findByIdAndUpdate(id, {
            title: req.body.title,
            content: req.body.content
        })
        .then(result => {
            res.status(200).redirect('/')
        })
        .catch(err => {
        res.status(500).send(err)
      
        })
    })



app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id
        Todos.findByIdAndRemove(id)
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send({err: 'could not delete the to-do'})
        })    
    })
   