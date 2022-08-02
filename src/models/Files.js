const { Schema, model } = require('mongoose');

const fileSchema = new Schema({
    parent_code: { type: String },
    mimetype: { type: String },
    path: { type: String },
    filename: { type: String },
    state: { type: Boolean, default: true },

});


module.exports = model('File', fileSchema);   