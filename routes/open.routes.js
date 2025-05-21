const express = require('express');
const { redirectURL} = require('../controllers/url.controller')
const router = express.Router();

router.get('/:url',redirectURL);



module.exports = router;