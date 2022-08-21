const { sequelize, Users} = require('../models');
const {userJoi} = require('../joi');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


function isAdmin(req){
    console.log(req.headers);
    let token = req.headers['authorization'];
    if(token == undefined)
        return false;
    token = token.split(' ')[1];
    if(token == undefined)
        return false;
    
    return jwt.decode(token).admin;
}

route.get('/users',(req,res) =>{
    Users.findAll()
    .then(rows =>res.json(rows))
    .catch(err=>res.status(500).json(err));

});

route.get('/', (req, res) => {
        Users.findAll()
        .then( rows => {
            rows.password
            res.json(rows)
        } )
        .catch( err => res.status(550).json(err) );
});

route.get('/:id', (req, res) => {
        Users.findOne({where: {id: req.params.id}})
        .then( rows =>{
            res.json(rows);
        })
        .catch( err => res.status(550).json(err) );
});


route.get('/name/:name', (req, res) => {
    Users.findOne({where: {firstname: req.params.firstname}})
    .then( rows => res.json(rows) )
    .catch( err => res.status(550).json(err) );
});


route.post('/', (req, res) => {
    if(isAdmin(req) == false){
        res.status(403).json(err);
        return;
    }
    userJoi.validateAsync(req.body).then(obj => {
        console.log(obj.email);
    obj = req.body;
    obj.password = bcrypt.hashSync(req.body.password, 10);
    console.log(obj.password);
        Users.create(obj).then(row =>{
            console.log("User succesfully created!");
            res.json(row);
        }).catch(err => res.status(500).json(err));

    }).catch(err => res.status(600).json(err));    
});


route.post('/register', (req, res) => {
    userJoi.validateAsync(req.body).then(obj => {
    obj = req.body;
    console.log(obj.email);
    obj.password = bcrypt.hashSync(req.body.password, 10);
    console.log(obj.password);
        Users.create(obj).then(row =>{
            console.log("User succesfully created!");
            res.json(row);
        }).catch(err => res.status(500).json(err));

    }).catch(err => res.status(600).json(err));    
});


route.put("/:id", (req, res) => {
    if(isAdmin(req) == false){
        res.status(403).json(err);
        return;
    }
    userJoi.validateAsync(req.body).then(obj => {
        Users.findOne({ where: { id: req.params.id }}).then(usr =>{
            usr.firstname = req.body.firstname;
            usr.lastname = req.body.lastname;
            usr.email = req.body.email;
            usr.password = bcrypt.hashSync(req.body.password, 10);
            usr.moderator = req.body.moderator;
            usr.admin = req.body.admin;
            usr.save();
            res.json(usr);
        }).catch(err => res.status(500).json(err));
    }).catch(err => res.status(600).json(err));   
});

route.delete('/:id', (req, res) => {
    if(isAdmin(req) == false){
        res.status(403).json(err);
        return;
    }
    Users.findOne({ where: {  id: req.params.id }}).then(usr =>{
        usr.destroy();
        res.json(usr);
    }).catch(err => res.status(500).json(err));

});

module.exports = route;