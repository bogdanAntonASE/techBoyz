const { Bug } = require("../model");

const getBugs = async(req, res) => {
    try {
        let bugs = await Bug.findAll();
        return res.status(200).send(bugs);
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
}

module.exports = {
    getBugs
}