const { User } = require("../model");

const login = async(req,res) => {
    try {
        await User.findAll().then(allUsers => {
            allUsers.forEach(element => {
                if (element.email == req.body.email) {
                    if (element.password == req.body.password) {
                        res.status(200).json({ success: true });
                    }
                    else {
                        res.status(404).json({ success: false });
                    }
                }
                else {
                    res.status(404).json({ success: false });
                }
            });
        });
    } catch (err) {
        return res.status(500).send({message: "Server Error"});
    }
}

const signup = async(req, res) => {
    try {
        await User.findAll().then(allUsers => {
            allUsers.forEach(element => {
                if (element.email == req.body.email) {
                    res.status(400).json({ success: false });
                }
            });
        });
        let user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            type: req.body.type
        });
        res.status(201).send(user);
    } catch (err) {
        return res.status(500).send({message: "Server Error"});
    }
}

module.exports = {
    login,
    signup
}