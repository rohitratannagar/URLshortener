const {getUser} = require('../utils/auth.utils')

function checkForAuthentication(req,res,next){
    const token = req.cookies?.uid;
    if(!token){
        return next();
    }
    
    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles = []){
    return function (req,res,next){
        if(!req.user) 
            return res.redirect('/login');

        if(!roles.includes(req.user.role))
            res.end('unAuthorized');

        return next();
    }
}
// async function restrictToLoggedInUserOnly(req,res,next){
//     const token = req.cookies?.uid;

//     if(!token) {
//         return res.redirect('/login');
//     }
//     const user = getUser(token);
    
    
//     if(!user) return res.redirect('/login');
//     // console.log("user is" ,user);
//     req.user = user;
//     next();
// }
// async function checkAuth(req,res,next){
//     const token = req.cookies?.uid;
//     const user = getUser(token);
//     req.user = user;
//     next();
// }

module.exports = {
   checkForAuthentication,
   restrictTo,
}