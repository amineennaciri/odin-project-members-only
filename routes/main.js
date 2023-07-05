const express = require('express');
const router = express.Router();
const homeController = require('./../controllers/home');
const postController = require('./../controllers/postUser');

router.get('/', homeController.getIndex);
router.get('/dashboard', homeController.getDash);
router.get('/signup', postController.getSignUp);
router.get('/login', postController.getLogIn);
router.post('/login', postController.postLogIn);
router.post('/postUser', postController.postSignUp);

module.exports = router;