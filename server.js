
const express = require("express")
const app = express()
const PORT = 3500
require('dotenv').config()  
const { default: mongoose } = require('mongoose')
const Todos = require("./models/todotasks")
const morgan = require('morgan')
const homeRoutes = require('./routes/homeRoutes')

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
app.use(express.json())



//routes

app.use(homeRoutes)
   