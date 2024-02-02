const express = require("express");
const router=express.Router()
const testingCon=require('../../controller/testing/testingCon')
const authenticateToken = require('../../middleware/auth');
const upload = require("../../middleware/upload");

// -------------------------- INDEX --------------------------
router.get('/index',authenticateToken ,testingCon.index)

// -------------------------- SIGN --------------------------
router.get('/signup',testingCon.getSignup)
router.post('/signup',testingCon.signup)

// -------------------------- LOGIN --------------------------
router.get('/login',testingCon.getLogin)
router.get('/logout',testingCon.logout)
router.post('/login',testingCon.login)

// -------------------------- PROFILE --------------------------
router.get('/profile',authenticateToken,testingCon.profile)

// -------------------------- UPDATE PROFILE --------------------------
router.get('/updateprofile',authenticateToken,testingCon.getProfile)
router.post('/updatedprofile',authenticateToken,upload.single('photo'),testingCon.updatedProfile)

// -------------------------- CHANGE PASSWORD --------------------------
router.get('/changepassword',authenticateToken,testingCon.getPassword)
router.post('/changedpassword',authenticateToken,testingCon.changedPassword)

// -------------------------- FORGET PASSWORD --------------------------
router.get('/forgetpassword',testingCon.getForgetPassword)
router.post('/forgetedpassword',testingCon.forgetedPassword)

// -------------------------- RESET PASSWORD --------------------------
router.get('/resetpassword/:token',testingCon.getResstPassword)
router.post('/resetedpassword/:token',testingCon.resetedPassword)


module.exports=router