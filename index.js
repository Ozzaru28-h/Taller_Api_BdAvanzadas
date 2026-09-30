'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;

// Conexión a tu base de datos 'gamesitoapi'
mongoose.connect('mongodb://localhost:27017/gamesitoapi')
    .then(() => {
        console.log('Conexión a la base de datos exitosa');

        // Creación del servidor web
        app.listen(port, () => {
            console.log(`Servidor corriendo correctamente en http://localhost:${port}`);
        });
    })
    .catch(err => console.log(err));
