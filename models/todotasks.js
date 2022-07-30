const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoTaskSchema = new Schema(
    { title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

    }, {timestamps: true})

    const Todos = mongoose.model('Todos', todoTaskSchema, 'tasks')
    module.exports = Todos