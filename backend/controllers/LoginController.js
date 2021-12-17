//const MethodOfTransport = require('../models').transportMethod;

const login = async(req,res) => {
    try {
        console.log("something");
        res.status(200).json({message: "hello"})
    } catch (err) {
        return res.status(404).send({message: "No data found"});
    }
}

module.exports = {
    login
}