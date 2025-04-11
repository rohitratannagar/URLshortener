const Request = require('../models/request.models');
const User = require('../models/user.models')


async function approveRequest(req, res) {
    const email = req.params.email;

    if (email === "ROHITRATANNAGAR2003@GMAIL.COM") {
        return res.json({ msg: `he is your dad.. don't even try to remove him` });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }
    await User.updateOne({ email }, {
        $set: {
            role: "ADMIN"
        }
    });

    await Request.deleteMany({ user: user._id });
    
    return res.redirect('/admin/requests');
}


async function showRequests(req,res){
    const requests = await Request.find({})
    .populate('user', 'name email') 

    return res.render('seeRequests',{
        currentPage: 'profile',
        requests,
    })
};
async function cancelRequest(req,res){
    const id = req.params.id;
    console.log(id);
    await Request.deleteMany({ user: id });
    return res.redirect('/admin/requests');
};

module.exports = {
    approveRequest,
    showRequests,
    cancelRequest,
}