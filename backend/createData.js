const model = require('./model');

const users = [
    { username: 'user1', password: 'pass1', email: 'email1@gmail.com' },
    { username: 'user2', password: 'pass2', email: 'email2@gmail.com' },
    { username: 'user3', password: 'pass3', email: 'email3@gmail.com' },
    { username: 'user4', password: 'pass4', email: 'email4@gmail.com' },
    { username: 'user5', password: 'pass5', email: 'email5@gmail.com' },
    { username: 'user6', password: 'pass6', email: 'email6@gmail.com' },
    { username: 'user7', password: 'pass7', email: 'email7@gmail.com' }
];

(async () => {
    await model.User.bulkCreate(users);
})();
