const mongoose = require('mongoose');
const {Schema} = mongoose;

const TeacherSchema = new Schema({
    name: {type: String},
    email: {type: String},
    image:{type:String},
    careers: {type: Array},
    degrees: {type: Array},
    positions: {type: Array},
    
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;