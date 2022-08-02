const mongoose = require('mongoose');
const {Schema} = mongoose;

const PublicationSchema = new Schema({
    author: {type: String},
    isbn: {type: String},
    description: {type: String},
    image: {type: String},
    pdf: {type: String},
    title: {type: String},
    type: {type: String},
    year: {type: Number}
});

const Publication = mongoose.model('Publication', PublicationSchema);

module.exports = Publication;
