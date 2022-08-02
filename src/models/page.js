const mongoose = require('mongoose');
const {Schema} = mongoose;

const PageSchema = new Schema({
    route:{type:String},
    banner: {type: String},
    title: {type: String},
    subtitle: {type: String},
    images: {type: Array},
    texts: {type: Array},
    files: {type: Array},
});

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;