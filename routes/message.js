const express = require('express');
const router = express.Router();
const homeController = require('./../controllers/home');
const postMsgController = require('./../controllers/postMessage');

router.get('/', homeController.getMessage);
router.post('/new', postMsgController.postMessage);

module.exports = router;