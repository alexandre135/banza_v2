const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb+srv://alexandre:alegun@135db@cluster0-dz1kh.mongodb.net/banza_v2?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})