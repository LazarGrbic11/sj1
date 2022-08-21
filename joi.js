const Joi = require('@hapi/joi');

const idJoi = Joi.object({
    id: Joi.number().integer().min(1).required()
});

const userJoi = Joi.object({
    firstname: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    lastname: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    password: Joi.string().trim().alphanum().min(6).max(20).required(),
    admin: Joi.boolean(),
    moderator: Joi.boolean(),
});
const loginJoi = Joi.object({
    username: Joi.string().trim().alphanum().min(6).max(20).required(),
    password: Joi.string().trim().alphanum().min(6).max(20).required()
});
const tagJoi = Joi.object({
    body: Joi.string().trim().alphanum().min(6).max(20).required()
});
const commentJoi = Joi.object({
    body: Joi.string().trim().alphanum().min(6).max(20).required()
});
const postJoi = Joi.object({
    header: Joi.string().trim().alphanum().min(6).max(20).required(),
    body: Joi.string().trim().alphanum().min(6).max(20).required()
});
module.exports = {
    idJoi,
    userJoi,
    loginJoi,
    tagJoi,
    commentJoi,
    postJoi
};
