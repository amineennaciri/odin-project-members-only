const express = require('express');
const router = express.Router();
const homeController = require('./../controllers/home');
const postMsgController = require('./../controllers/postMessage');

router.get('/', homeController.getMessage);
router.post('/new', postMsgController.postMessage);
router.delete('/deleteMessage', postMsgController.deleteMessage);

module.exports = router;