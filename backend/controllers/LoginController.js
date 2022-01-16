const { User } = require("../model");

const login = async(req,res) => {
    try {
        await User.findAll().then(allUsers => {
            allUsers.forEach(element => {
                if (element.email == req.body.email) {
                    if (element.password == req.body.password) {
                        return res.status(200).json({ success: true });
                    }
                    else {
                        return res.status(404).json({ success: false, text: "Incorrect password for " + req.body.email + "."});
                    }
                }
                else {
                    return res.status(404).json({ success: false, text: "Email is not present in database." });
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
                if (element.email === req.body.email) {
                    return res.status(400).json({ success: false, text: "Email already existing in database." });
                }
            });
        });
        let user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            type: req.body.type
        });
        return res.status(201).send(user);
    } catch (err) {
        return res.status(500).send({message: "Server Error"});
    }
}

module.exports = {
    login,
    signup
}