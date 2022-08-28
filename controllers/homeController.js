const Todos = require("../models/todotasks")

module.exports.get_main = (req, res) => {
    Todos.find()
    .then(result => {
        res.render('index', {todoTask:result})
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports.post_main = (req, res) => {
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
    }

module.exports.get_edit = (req,res) => {
    const id = req.params.id;
    Todos.find()
    .then(result => {
        res.render('edit.ejs',{
            todoTask: result, idTask: id})
    })

    }

   module.exports.put_edit = (req,res) => {
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
    }
    
    module.exports.get_delete = (req, res) => {
        const id = req.params.id
        Todos.findByIdAndRemove(id)
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send({err: 'could not delete the to-do'})
        })    
    }