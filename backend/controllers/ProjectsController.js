const { Project } = require("../model");

const getProjectsForUser = async(req, res) => {

}

const getProjects = async(req, res) => {
    try {
        console.log('hello');
        let projects = await Project.findAll();
        res.status(200).send(projects);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
}

module.exports = {
    getProjects,
    getProjectsForUser
}