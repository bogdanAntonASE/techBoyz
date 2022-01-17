const { Bug } = require("../model");
const { ProjectUser } = require("../model");

const getBugs = async(req, res) => {
    try {
        console.log(req);
        let bugs = await Bug.findAll({
            where: {
                project_id: req.body.id
            }
        });
        return res.status(200).send(bugs);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
}

const insertBug = async(req, res) => {
    try {
        let projectUserReporter = await ProjectUser.findOne({
            where: {
                project_id: req.body.project_id,
                email: req.body.reporter,
            },
        });
        if (req.body.asignee !== '') {
            let projectUserAsignee = await ProjectUser.findOne({
                where: {
                    project_id: req.body.project_id,
                    email: req.body.asignee,
                },
            });
            if (projectUserAsignee === null) {
                return res.status(400).send({ success: false, text: 'The asignee is not member of the specified project id.'})
            }
        }
        
        if (projectUserReporter === null) {
            return res.status(400).send({ success: false, text: 'The reporter is not member of the specified project id.'})
        }
        else {
            let bug = await Bug.create({
                severity: req.body.severity,
                priority: req.body.priority,
                description: req.body.description,
                commit: req.body.commit,
                project_id: req.body.project_id,
                asignee: req.body.asignee,
                reporter: req.body.reporter
            });
            return res.status(201).send({success: true, bug: bug});
        }
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
}

const deleteBug = async(req, res) => {
    try {
        const bugToBeDeleted = await Bug.findByPk(req.params.id);
        if (bugToBeDeleted) {
            let projectId = bugToBeDeleted.project_id;
            await bugToBeDeleted.destroy()
            return res.status(200).send({ success: true, projectId: projectId })
        } else {
            return res.status(404).send({ success: false, text: "Bug not present in database."});
        }
    }
    catch (err) {
        return res.status(500).send({message: "Server Error"});
    }
}  

module.exports = {
    getBugs,
    insertBug,
    deleteBug
}