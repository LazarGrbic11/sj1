const users = require('./users');
const comment = require('./comment');
const post = require('./post');
const tag = require('./tag');

const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.use('/users', users);
route.use('/post', post);
route.use('/comment', comment);
route.use('/tag', tag);

module.exports = route;