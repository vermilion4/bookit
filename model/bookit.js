const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookname:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})

const Book = mongoose.model('Book',BookSchema)
module.exports = Book