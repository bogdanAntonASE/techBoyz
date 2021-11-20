
const login = async (req, res) => {
    try {
        console.log(req);
        res.status(200).json("Hello");
    }
    catch (err) {
        console.log('Helloo')
        res.status(404).send({
            message: 'No users found',
        });
    }
}