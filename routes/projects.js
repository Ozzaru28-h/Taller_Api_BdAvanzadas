'use strict'

var express = require('express');
var ProjectController = require('../controllers/projects');

var router = express.Router();

router.get('/home', ProjectController.home);
router.post('/test-controller', ProjectController.test);
router.post('/save-agent', ProjectController.saveProject);
router.get('/agent{/:id}', ProjectController.getProject);
router.get('/agents', ProjectController.getProjects);
router.put('/update-agent/:id', ProjectController.updateProject);
router.delete('/delete-agent/:id', ProjectController.deleteProject);
module.exports = router;