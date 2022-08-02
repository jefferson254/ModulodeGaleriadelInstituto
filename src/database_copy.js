//URI autenticada
// const URI = 'mongodb://user_web:KinswomanFloristUpstageTaekwondoEngraverOveractDemeanorStraddleFlop@mongo:27017/web';
//Ingreso sin autenticación
const URI = 'mongodb://localhost:27017/web';
const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // authSource:"admin"
        });
    } catch (error) {
        throw new Error(error);
    }


}

module.exports = {
    dbConnection
}
