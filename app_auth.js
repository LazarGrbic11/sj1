const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) => {
    console.log("Registrujem se");
    const obj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        admin: req.body.admin,
        moderator: req.body.moderator
    };

    Users.create(obj).then( rows => {
        
        const usr = {
            firstname: rows.firstname,
            lastname:rows.lastname,
            admin: rows.admin,
            moderator: rows.moderator
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/login', (req, res) => {
    console.log("Logujem se: " + req.body.firstname);
    Users.findOne({ where: { firstname: req.body.firstname } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    firstname: usr.firstname,
                    lastname :usr.lastname,
                    admin: usr.admin,
                    moderator: usr.moderator
                };         
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                console.log(jwt.decode(token));
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});


app.listen({ port: 7000 }, async () => {
    console.log("Startovan port 7000");
    await sequelize.authenticate();
});