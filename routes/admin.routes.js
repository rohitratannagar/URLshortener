const express = require('express');

const URL = require('../models/url.models')



const {approveRequest,showRequests, cancelRequest} = require('../controllers/admin.controller')

const router = express.Router();

router.get('/allURLs', async (req,res)=>{
    const URLs = await URL.find({});
    return res.render("allURLs",{
        urls: URLs,
        currentPage: 'URL',
        role: 'ADMIN',
        data: 'see your URLS'
    })
})
router.get('/requests', showRequests)

router.post('/requests/approve/:email',approveRequest )
router.post('/requests/cancel/:id',cancelRequest )

module.exports = router;