const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { format } = require('timeago.js');

const mongoose = require('mongoose');

//Initialization 
const app = express();

require('./database');



/**
 * MOTOR DE PLANTILLAS
 */
const isEqualHelperHandlerbar = function (a, b, opts) {
    if (a == b) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
}

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: {
        if_equal: isEqualHelperHandlerbar
    }
}));
app.set('view engine', '.hbs');
/**
 * RUTAS
 */
//widdleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));


// app.use(multer({ storage: storage }).single('image'));

app.use((req, res, next) => {
    app.locals.format = format;
    next();
})


app.use(express.static(path.join(__dirname, 'public')));
//rutas
app.use(require('./routes/index.route'));
app.use("/galeria", require('./routes/categorias.route'));

/**
 * EJECUTAR SREVIDOR
 */
app.set('port', process.env.PORT || 2323);
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
