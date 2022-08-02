const mongoose = require('mongoose');
const {Schema} = mongoose;

const CareerSchema = new Schema({
    banner:{type: String},
    code:{type: String},
    coordinador_name:{type: String},
    coordinador_correo:{type: String},
    cost:{type: String},
    teachers:{type: String},
    curricular_mesh:{type: String},
    curricular_mesh_pdf:{type: String},
    modality:{type: String},
    name:{type: String},
    resolution:{type: String},
    resolution_pdf:{type: String},
    title:{type: String},
    section_text:{type: String},
    section_video:{type: String},
    duration:{type: String}
});

const Career = mongoose.model('Career', CareerSchema);

module.exports = Career;
