const express = require('express');
const URL = require('../models/url.models')
const {restrictTo} = require('../middlewares/auth.middleware')
const User = require('../models/user.models')
const router = express.Router();


// router.get('/admin/allURLs',restrictTo(['ADMIN']), async (req,res)=>{
//     const URLs = await URL.find({});
//     return res.render("AllURLs",{
//         urls: URLs,
//         currentPage: 'URL',
//         role: 'ADMIN',
//         data: 'see your URLS'
//     })
// })
// router.get('/admin/requests',restrictTo(['ADMIN']), async (req,res)=>{
//     return res.render('SeeRequests.ejs', {
//         currentPage: 'profile'
//     })
// })


router.get('/', restrictTo(['USER','ADMIN']), async (req,res)=>{
    res.render('home', { currentPage: 'home' });
})

router.get('/allURLs',restrictTo(['USER','ADMIN']),async (req,res)=>{
   
    const URLs = await URL.find({createdBy: req.user._id});
    
    return res.render("allUrls",{
        urls: URLs,
        currentPage: 'URL',
        role: req.user.role,
        data: null,
    })
} )
router.get('/me',restrictTo(['USER','ADMIN']), async (req,res)=>{

    const user = await User.findById(req.user._id); 
    req.user = user;
    return res.render('profile', { 
        user,
        currentPage: 'profile'
     });
} )
router.get('/edit-profile',async (req,res)=>{

    if(!req.user) return res.redirect('/login');
    return res.render('edit',{
        user: req.user,
        currentPage: 'profile',
    })
} )

router.get('/signup', async (req,res) => {
    return res.render("signup");
})

router.get('/login',(req,res)=>{
    res.render('login');
})

module.exports = router;