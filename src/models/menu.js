const mongoose = require('mongoose');
const {Schema} = mongoose;

const MenuSchema = new Schema({
    name: {type: String},
    shortname: {type: String},
    images:{type:String},
    description:{type:String},
    icon: {type: String},
    link: {type: String},
    target: {type: String},
    color: {type: String},
    size: {type: String},
    type: {type: String},
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;