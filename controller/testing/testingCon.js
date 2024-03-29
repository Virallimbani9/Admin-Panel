const User = require("../../model/testing/testing");
const Empl = require("../../model/employee/employeeSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require("../../utils/mail");

const fs = require("fs");
const path = require("path")


// -------------------------- INDEX --------------------------

index = async (req, res) => {
  const count = await Empl.countDocuments();
  const data = req.user;
  res.render('index',{data,count})
}


// -------------------------- SIGN --------------------------

signUp = async (req, res) => {
    const { name, password,email,city,phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = new User({ name, password: hashedPassword ,email,phone,city});
      await user.save();
      res.redirect('/testing/login');
        } catch (error) {
      res.send('Error creating user');
    }
};

getSignUp = async (req, res) => {
  res.render('pages/auth/pages-signup')
}


// -------------------------- LOGIN --------------------------

logIn = async (req, res) => {

 const { name, password } = req.body;
 const user = await User.findOne({ name });

    try {
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id },process.env.SECRET_KEY);
        res.cookie("token",token)
        res.redirect('/testing/index');   
      } else {
        res.send('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
      res.send('Error logging in');
    }
    };

getLogIn = async (req, res) => {
  res.render('pages/auth/pages-login')
}

logOut = async (req, res) => {

  res.clearCookie("token")
  res.redirect('/testing/login')
}


// -------------------------- PROFILE --------------------------

profile = async (req, res) => {
  res.render('pages/user/profile',{data:req.user})
}


// -------------------------- UPDATE PROFILE --------------------------

getUpdaetProfile = async (req, res) => {
  res.render('pages/user/updateprofile',{data:req.user})
}

updatedProfile = async (req, res) => {
  const { name,email,city,phone } = req.body;
  try {
    const orgPath = path.join(__dirname,"../../public/assets/upload");
    const photoLoc1 = `${orgPath}/${req.photoLoc}`;
    const exists = fs.existsSync(photoLoc1);
    
    if(!exists){
      const user = await User.findByIdAndUpdate(req.user._id,{photo:req.file.filename});
      await user.save();
    
    }if (exists) {
      fs.unlinkSync(photoLoc1);
    }

    const user = await User.findByIdAndUpdate(req.user._id,{ name,email,phone,city,photo:req.file.filename});
    await user.save();
    res.redirect('/testing/profile');
      } catch (error) {
    res.redirect('/testing/updateprofile');
  }
}


// -------------------------- CHANGE PASSWORD --------------------------

getPassword = async (req, res) => {
  res.render('pages/auth/changepassword',{data:req.user})
}

changedPassword = async (req, res) => {
  console.log(req.body)
  
  try {

    const { password, newPassword , confirmPassword } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    const valid = await bcrypt.compare(password, user.password);

    if (!user || !valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    else if(newPassword != confirmPassword){
      return res.status(401).json({ message: 'Password not match' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.clearCookie("token")
    res.redirect('/testing/logout');
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
}


// -------------------------- FORGET PASSWORD --------------------------

getForgetPassword = async (req, res) => {
  res.render('pages/auth/forgetpassword')
}

forgetedPassword = async (req, res) => {
 try {
  const { email } = req.body;
  
  const user = await User.findOne({ email:email });
  
  if(!user){
    return res.status(401).json({ message: 'Invalid credentials' }); 
  }
  const token = jwt.sign({ id: user._id },process.env.SECRET_KEY,{expiresIn: '1m'});
 
  sendMail({
    email:user.email,
    subject:"Reset Password",
    message: `Hi ${user.name}, Please click on the link below to reset your password."http://localhost:3000/testing/resetpassword/${token}" Reset Password Thanks`,
  }) 

  res.redirect('/testing/login');
}
catch (error) {
  console.log(error)
  res.status(500).json({ message: 'Internal server error' });
}}


// -------------------------- RESET PASSWORD --------------------------

getResstPassword = async (req, res) => {
  res.render('pages/auth/resetpassword',{data:req.params.token})
}

resetedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const token = req.params.token;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    else if(newPassword != confirmPassword){
      return res.status(401).json({ message: 'Password not match' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.redirect('/testing/login');
  } catch (error) {
    console.log(error)
    res.redirect('/testing/resetesdpassword/:token')
  }
},






module.exports = {
    index,
    getSignUp,
    signUp,
    getLogIn,
    logIn,
    logOut,
    profile,
    getUpdaetProfile,
    updatedProfile,
    getPassword,
    changedPassword,
    getForgetPassword,
    forgetedPassword,
    getResstPassword,
    resetedPassword
}
