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