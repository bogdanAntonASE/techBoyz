const { Project } = require("../model");
const { User } = require("../model");

const getProjectsForUser = async(req, res) => {

}

const getProjects = async(req, res) => {
    try {
        let projects = await Project.findAll();
        return res.status(200).send(projects);
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
}

const postProject = async(req, res) => {
    try {
        await Project.findAll().then(allProjects => {
            allProjects.forEach(element => {
                if (element.name == req.body.name) {
                    return res.status(400).json({ success: false, text: "Project already existing." });
                }
            });
        });
        let found = false;
        await User.findAll().then(allUsers => {
            for (let user in allUsers) {
                if (user.email === req.body.owner) {
                    found = true;
                    break;
                }
            }
            if (found === false) {
                return res.status(400).json({ success: false, text: "Owner is not present in database." });
            }
        })
        if (req.body.projectName.trim() !== "" && req.body.owner.trim() !== "" && req.body.git.trim() !== "") {
            let project = await Project.create({
                name: req.body.projectName,
                owner: req.body.owner,
                url: req.body.git
            });
            return res.status(201).send({ success: true, id: project.id});
        }
        return res.status(400).send({ success: false, text: "Unexpected issue happened!" });
    } catch (err) {
        return res.status(500).send({message: "Server Error"});
    }
}

module.exports = {
    getProjects,
    getProjectsForUser,
    postProject
}