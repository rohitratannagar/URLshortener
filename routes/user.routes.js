const express = require('express');
const {signupUser,loginUser,logoutUser,handleRequest} = require('../controllers/user.controller');
const router = express.Router();

router.post('/',signupUser );
router.post('/login',loginUser);
router.get('/logout',logoutUser)
router.get('/request', async (req,res)=>{
    return res.render('makeRequest', {
        currentPage: 'profile',
    })
})
router.post('/request', handleRequest)
// router.get('/request/success', (req, res) => {
//     res.render("makeRequest", {
//         currentPage: 'profile',
//         success: true  
//     });
// });

module.exports = router;