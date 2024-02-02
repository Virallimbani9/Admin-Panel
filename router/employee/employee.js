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
router.get("/view/:id",employeeList.viewemployeedata);


// ------------------- UPDATE DATA------------------------------
router.post("/updatestatus/:id",employeeList.updatestatus);


// ------------------- UPDATE EMPLOYEE------------------------------
router.get("/getupdateemployee/:id",employeeList.getupdateemployee);
router.post("/updateemployee/:id",employeeList.updateemployee);


// ------------------- DELETE EMPLOYEE------------------------------
router.delete("/deleteemployee/:id",employeeList.deleteemployee);

module.exports=router