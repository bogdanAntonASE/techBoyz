const { Bug } = require("../model");

const getBugs = async(req, res) => {
    try {
        let bugs = await Bug.findAll({
            where: {
                project_id: req.body.id
            }
        });
        return res.status(200).send(bugs);
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
}

module.exports = {
    getBugs
}