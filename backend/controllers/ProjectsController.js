const { Project } = require("../model");
const { User } = require("../model");
const { ProjectUser } = require("../model");

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
                if (element.name === req.body.projectName) {
                    return res.status(400).json({ success: false, text: "Project already existing." });
                }
            });
        });
        let found = false;
        await User.findAll().then(async (allUsers) => {
            for (let user of allUsers) {
                if (user.email === req.body.owner) {
                    found = true;
                    break;
                }
            }
            if (found === false) {
                return res.status(400).json({ success: false, text: "Owner is not present in database." });
            }
            else {
                if (req.body.projectName.trim() !== "" && req.body.owner.trim() !== "" && req.body.git.trim() !== "") {
                    let project = await Project.create({
                        name: req.body.projectName,
                        owner: req.body.owner,
                        url: req.body.git
                    });
                    return res.status(201).send({ success: true, id: project.id});
                }
            }
        })
        
        return res.status(400).send({ success: false, text: "Unexpected issue happened!" });
    } catch (err) {
        return res.status(500).send({message: "Server Error"});
    }
}

const deleteProject = async(req, res) => {
    try {
        const projectToBeDeleted = await Project.findByPk(req.params.id)
        if (projectToBeDeleted) {
            await projectToBeDeleted.destroy()
            return res.status(200).send({ success: true })
        } else {
            return res.status(404).send({ success: false, text: "Project not present in database."});
        }
    }
    catch (err) {
        return res.status(500).send({message: "Server Error"});
    }
}  

const checkMember = async(req, res) => {
    try {
        let projectUser = await ProjectUser.findOne({
            where: {
                project_id: req.body.id,
                email: req.body.email,
            },
        });
        if (projectUser !== null) {
            return res.status(200).send({ isMember: true })
        }
        else {
            return res.status(200).send({ isMember: false });
        }
    }
    catch (err) {
        return res.status(500).send({message: "Server Error"});
    }
}

const joinProject = async(req, res) => {
    try {
        let projectUser = await ProjectUser.findOne({
            where: {
                project_id: req.body.id,
                email: req.body.email,
            },
        });
        if (projectUser !== null) {
            return res.status(400).send({ success: false, text: "The user is already present in project as member." })
        }
        else {
            let project = await ProjectUser.create({
                project_id: req.body.id,
                email: req.body.email
            });
            let user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (user) {
                await user.update({
                    type: 'MP'
                });
            }
            return res.status(201).send({ success: true, project: project });
        }

    }
    catch (err) {
        return res.status(500).send({message: "Server Error"});
    }
}

module.exports = {
    getProjects,
    getProjectsForUser,
    postProject,
    deleteProject,
    checkMember,
    joinProject
}