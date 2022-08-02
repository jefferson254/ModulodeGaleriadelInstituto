const mongoose = require('mongoose');
const {Schema} = mongoose;

const CompanySchema = new Schema({
    name: {type: String},
    link: {type: String},
    target: {type: String},
    logo: {type: String},
    type: {type: String},
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;