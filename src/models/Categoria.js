const { Schema, model } = require('mongoose');
const File = require('./Files')
const categoriaSchema = new Schema({
    code: { type: String },
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    path: [{ type: String }],
    parent_id: { type: String, defaul: "" },
    originalname: { type: String },
    files: [{ type: String }],
    mimetype: { type: String },
    size: { type: Number },
    created_at: { type: String, defaul: new Date("DD/MM/YYYY") },

});


module.exports = model('Categoria', categoriaSchema); 