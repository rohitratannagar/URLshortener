const express = require('express')

const User = require('../models/user.models.js');
const router = express.Router();

router.get('/', async (req,res)=>{
    
    const users = await User.find({
        role: "USER",
        _id: { $ne: req.user._id }
    });

    const admins = await User.find({
        role: "ADMIN",
        _id: { $ne: req.user._id }
    });
    return res.render("AllUsers",{
        users: users,
        admins: admins,
        currentPage: 'users',
    })
})

module.exports = router;
