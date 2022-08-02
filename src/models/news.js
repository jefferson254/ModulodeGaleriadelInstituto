const mongoose = require('mongoose');
const {Schema} = mongoose;

const NewsSchema = new Schema({
    image: {type: String},
    title: {type: String},
    short_description: {type: String},
    description: {type: Array},
    date: {type: String},
    author: {type: String},
    target: {type: String},
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;