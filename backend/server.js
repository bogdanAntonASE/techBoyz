const { req, res } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT = require('./config/config.sample.json').port;
const routes = require('./routes');
const cors = require('cors');
const model = require('./model');

model.sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log(err);
        console.log('Unable to connect to database');
    });

model.sequelize.sync();
model.sequelize.sync({ alter: true });

app.use(cors());
app.use('/api', routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});
