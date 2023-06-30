const express = require('express');
const router = express.Router();
const postController = require('./../controllers/postUser');

router.get('/', postController.getSignUp);
router.post('/postUser', postController.postSignUp);

module.exports = router;