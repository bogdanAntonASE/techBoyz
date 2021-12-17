const { req, res } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT = 3001;
const routes = require('./routes');
const cors = require('cors');
const model = require('./model');
const loginController = require('./controllers/LoginController');

model.sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log(err);
        console.log('Unable to connect to database');
    });

// Standard
model.sequelize.sync();

//If we have modification for the tables
model.sequelize.sync({ alter: true });

app.use(cors());
app.use('/api', routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});
