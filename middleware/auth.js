const jwt = require('jsonwebtoken');
const User = require("../model/testing/testing");



async function authenticateToken(req, res, next) {
    const token = req.cookies.token || req.params.token;

    if (!token) {
      return res.redirect('/testing/login')
    }
    const decodedata= jwt.verify(token,process.env.SECRET_KEY);  

    const user = await User.findOne({_id:decodedata.id})
  
    jwt.verify(token,process.env.SECRET_KEY, (err, user1) => {
      if (err) {
        return res.status(403).send('Invalid token');
      }
      req.photoLoc = user.photo;
      user.photo=process.env.url+"/assets/upload/"+user.photo
      req.user =user;
      next();
    });
  }

module.exports = authenticateToken;