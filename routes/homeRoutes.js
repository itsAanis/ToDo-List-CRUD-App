
const {Router} = require('express')
const router = Router ()
const homeController = require("../controllers/homeController")
const Todos = require("../models/todotasks")



router.get('/', homeController.get_main)

router.post('/', homeController.post_main)



router
.route("/edit/:id")
.get((req,res) => {
const id = req.params.id;
Todos.find()
.then(result => {
    res.render('edit.ejs',{
        todoTask: result, idTask: id})
})
}) 



router.put("/edit/:id",(req,res) => {
    const {data, title} = req.body
    console.log(req.body)
    const id =req.params.id
    console.log(id)
    Todos.findByIdAndUpdate(id, {
        content: data,
        title : title
    }).then((result) =>{
   return res.status(201).json({redirect:'/'})
})
.catch(err => {
    res.status(500).send(err)})
})

    /*
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
}) */



router
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

module.exports = router