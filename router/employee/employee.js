const express = require("express");
const router=express.Router()
const employeeList=require('../../controller/admin/employeeList');
const authenticateToken = require('../../middleware/auth');


// ------------------ INSERT DATA ---------------------
router.post('/insert',employeeList.insertData);


// ------------------ FIND DATA ----------------------
router.get("/finddata",employeeList.findData);


// ------------------ GET EMPLOYEE LIST ----------------------
router.get("/getemplist",authenticateToken ,employeeList.getempList);


// ------------------ GET EMPLOYEE DATA ----------------------
router.get("/getemployeedata",authenticateToken,employeeList.getemployeedata)


// ------------------- VIEW DATA------------------------------
router.get("/view/:id",authenticateToken,employeeList.viewemployeedata);


// ------------------- UPDATE DATA------------------------------
router.post("/updatestatus/:id",authenticateToken,employeeList.updatestatus);


// ------------------- UPDATE EMPLOYEE------------------------------
router.get("/getupdateemployee/:id",authenticateToken,employeeList.getupdateemployee);
router.post("/updateemployee/:id",authenticateToken,employeeList.updateemployee);


// ------------------- DELETE EMPLOYEE------------------------------
router.delete("/deleteemployee/:id",authenticateToken,employeeList.deleteemployee);

module.exports=router