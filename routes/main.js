const express = require('express');
const router = express.Router();
const homeController = require('./../controllers/home');
const postUsrController = require('./../controllers/postUser');

router.get('/', homeController.getIndex);
router.get('/signup', postUsrController.getSignUp);
router.get('/login', postUsrController.getLogIn);
router.post('/login', postUsrController.postLogIn);
router.get('/logout', postUsrController.getLogOut);
router.post('/postUser', postUsrController.postSignUp);

//membership and admin access routes
router.get('/club', homeController.getClub);
router.post('/join', postUsrController.postClub);

module.exports = router;