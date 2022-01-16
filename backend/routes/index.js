const express = require('express');
const router = express();

const loginController = require('../controllers/LoginController');
const projectsController = require('../controllers/ProjectsController');
router.post('/login', loginController.login);
router.post('/signup', loginController.signup);
router.get('/projects', projectsController.getProjects);
router.post('/projects', projectsController.postProject);
module.exports = router;
