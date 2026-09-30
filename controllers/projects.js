'use strict'

var Project = require('../models/projects');

var controller = {
    home: function(req, res) {
        return res.status(200).send({
            message: 'Soy la ruta home del controlador de Valorant'
        });
    },

    test: function(req, res) {
        return res.status(200).send({
            message: 'Soy el método test del controlador'
        });
    },
    // NUEVO MÉTODO PARA GUARDAR UN AGENTE
    saveProject: function(req, res) {
        var project = new Project();
        var params = req.body; // Aquí recogemos los datos que nos envíen por POST

        project.name = params.name;
        project.role = params.role;
        project.abilities = params.abilities;
        project.release_year = params.release_year;

        // Guardamos en la base de datos
        project.save()
            .then(projectStored => {
                if (!projectStored) return res.status(404).send({message: 'No se pudo guardar el agente.'});
                return res.status(200).send({ agent: projectStored }); // Si sale bien, devuelve el agente guardado
            })
            .catch(err => {
                return res.status(500).send({message: 'Error al guardar el documento.'});
            });
    },
    // 1. OBTENER UN SOLO AGENTE POR ID
    getProject: function(req, res) {
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({message: 'El agente no existe.'});

        Project.findById(projectId)
            .then(project => {
                if (!project) return res.status(404).send({message: 'El agente no existe.'});
                return res.status(200).send({ agent: project });
            })
            .catch(err => {
                return res.status(500).send({message: 'Error al devolver los datos.'});
            });
    },

    // 2. OBTENER TODOS LOS AGENTES
    getProjects: function(req, res) {
        Project.find({})
            .then(projects => {
                if (!projects) return res.status(404).send({message: 'No hay agentes para mostrar.'});
                return res.status(200).send({ agents: projects });
            })
            .catch(err => {
                return res.status(500).send({message: 'Error al devolver los datos.'});
            });
    },
    // 1. ACTUALIZAR UN AGENTE (PUT)
    updateProject: function(req, res) {
        var projectId = req.params.id;
        var update = req.body;

        // {new: true} devuelve el documento ya modificado
        Project.findByIdAndUpdate(projectId, update, {new: true})
            .then(projectUpdated => {
                if (!projectUpdated) return res.status(404).send({message: 'No existe el agente para actualizar.'});
                return res.status(200).send({ agent: projectUpdated });
            })
            .catch(err => {
                return res.status(500).send({message: 'Error al actualizar los datos.'});
            });
    },

    // 2. ELIMINAR UN AGENTE (DELETE)
    deleteProject: function(req, res) {
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId)
            .then(projectRemoved => {
                if (!projectRemoved) return res.status(404).send({message: 'No existe el agente para eliminar.'});
                return res.status(200).send({ agent: projectRemoved });
            })
            .catch(err => {
                return res.status(500).send({message: 'Error al borrar el agente.'});
            });
    }
};


module.exports = controller;