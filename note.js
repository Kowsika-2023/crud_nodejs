const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    name: String,
    price: Number,
    type: String,
    shop: String,
    status: Boolean

});
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;