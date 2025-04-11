const URL = require('../models/url.models');
const shortid = require('shortid');

async function generateShortURL(req,res){
    if(!req.body.url){
        return res.status(400).json({err: "url is required"});
    }
    const shortURL = shortid.generate();
    const result = await URL.create({
        shortURL,
        realURL: req.body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })
    return res.render("home", {
      id : shortURL,
      currentPage: 'home',
    })
}

async function redirectURL(req,res){
     const shortURL = req.params.url;
    try {
        const entry = await URL.findOneAndUpdate(
          {shortURL},
          {
            $push: {
              visitHistory: {
                timestamps: Date.now(),
              },
            }
          }
        )
        if (entry) {
          res.redirect(entry.realURL);
        } else {
          console.log(`Url doesn't exist`);
        }
      } catch (err) {
        console.error('Error finding url:', err);
      }
}

// async function getAnalytics(req,res){
//   const shortURL = req.params.shortURL;
//   if(!shortURL){
//       return res.status(400).json({err: "url is required"});
//   }

//   const data = await URL.findOne({shortURL});
//   return res.json({
//     TotalClicks: data.visitHistory.length,
//     analytics: data.visitHistory
//   })
// }

async function deleteURL(req,res){
  const shortURL = req.params.shortURL;
  const data = await URL.deleteOne({shortURL});
  if(!data) console.log('error in deleting aURL');
  res.redirect('/allUrls')
}

module.exports = {
    generateShortURL,
    redirectURL,
    deleteURL
}