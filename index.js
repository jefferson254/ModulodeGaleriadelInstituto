if (process.env.NODE_END !== 'production') {
    require('dotenv').config();
}
require('dotenv').config();

const app = require('./app');

app.listen(app.get('port'),() => {

console.log('Sever on port' , app.get('port'));
console.log('Environment: ', process.env.Node_ENV);
});