const express = require('express');
const router = express();

const loginController = require('../controllers/LoginController');
const projectsController = require('../controllers/ProjectsController');
const bugsController = require('../controllers/BugsController');

router.post('/login', loginController.login);
router.post('/signup', loginController.signup);
router.get('/projects', projectsController.getProjects);
router.post('/projects', projectsController.postProject);
router.delete('/projects/:id', projectsController.deleteProject);
router.post('/projects/member', projectsController.checkMember);
router.post('/projects/join', projectsController.joinProject);
router.post('/bugs', bugsController.getBugs);
router.post('/bugsInsert', bugsController.insertBug);
router.delete('/bugs/:id', bugsController.deleteBug);

module.exports = router;
