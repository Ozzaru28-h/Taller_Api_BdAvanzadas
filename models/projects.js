'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Esquema adaptado a los campos de Valorant que creaste en MongoDB Compass
var ProjectSchema = Schema({
    name: String,
    role: String,
    abilities: [String],
    release_year: String
});

// El tercer argumento 'project_dbclass' le indica a Mongoose el nombre exacto de tu colección en Compass
module.exports = mongoose.model('Projects', ProjectSchema, 'project_dbclass');