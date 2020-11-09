const users = require('express').Router();
const {
  getUserInfo,
} = require('../controllers/users');

users.get('/users/me', getUserInfo);

module.exports = users;
