const express = require('express');
const {generateShortURL, redirectURL, deleteURL} = require('../controllers/url.controller')
const router = express.Router();

router.post('/',generateShortURL);
router.post('/delete/:shortURL', deleteURL);
router.get('/:url', redirectURL);


module.exports = router;