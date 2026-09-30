'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar Archivos de Rutas
var project_routes = require('./routes/projects'); 

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS (configuración de permisos)

// Rutas base
app.use('/api', project_routes);

// Exportar el módulo
module.exports = app;