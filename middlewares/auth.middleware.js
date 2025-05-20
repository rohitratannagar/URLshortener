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













// const jwt = require('jsonwebtoken');
// const User = require('../models/user.models');

// module.exports = async function authenticate(req, res, next) {
//   try {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(401).json({ message: 'Invalid token' });

//     // Optional: Check if role changed or other flag
//     if (decoded.role !== user.role) {
//       return res.status(403).json({ message: 'Session expired. Please log in again.' });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Token expired or invalid' });
//   }
// };
