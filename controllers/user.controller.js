
const User = require('../models/user.models');
const Request = require('../models/request.models');
const {setUser}  = require('../utils/auth.utils');

async function signupUser(req,res){
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
    });
    const token = setUser({
        _id: user._id,
        email: user.email,
        role: user.role,
    });
    res.cookie('uid',token); 
    return res.redirect("/");
}

async function loginUser(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    
    if(!user){
        return res.redirect('/login'
        );
    }
    
    const token = setUser({
        _id: user._id,
        email: user.email,
        role: user.role,
    });
    res.cookie('uid',token); 
    return res.redirect("/");
}
async function logoutUser(req,res){
    
    if(!req.user) return redirect('/');
    
    res.cookie('uid',"", {maxAge: 1}); 
    res.set('Cache-Control', 'no-store');
    return res.redirect("/");
}

async function handleRequest(req, res) {
    const { message } = req.body;

    try {
        const request = await Request.create({
            user: req.user._id,
            message,
        });

        if (!request) {
            return res.status(500).send('Server error');
        }
        return res.render("makeRequest", {
            currentPage: 'profile',
            success: true  
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Something went wrong');
    }
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    handleRequest
}