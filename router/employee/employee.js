const express = require("express");
const router=express.Router()
const employeeList=require('../../controller/admin/employeeList');
const authenticateToken = require('../../middleware/auth');


// ------------------ INSERT DATA ---------------------
router.post('/insert',employeeList.insertData);


// ------------------ FIND DATA ----------------------
router.get("/finddata",employeeList.findData);


// ------------------ GET EMPLOYEE LIST ----------------------
router.get("/getemplist",authenticateToken ,employeeList.getEmpList);


// ------------------ GET EMPLOYEE DATA ----------------------
router.get("/getemployeedata",authenticateToken,employeeList.getEmployeeData)


// ------------------- VIEW DATA------------------------------
router.get("/view/:id",authenticateToken,employeeList.viewEmployeeData);


// ------------------- UPDATE DATA------------------------------
router.post("/updatestatus/:id",authenticateToken,employeeList.updateStatus);


// ------------------- UPDATE EMPLOYEE------------------------------
router.get("/getupdateemployee/:id",authenticateToken,employeeList.getUpdateEmployee);
router.post("/updateemployee/:id",authenticateToken,employeeList.updateEmployee);


// ------------------- DELETE EMPLOYEE------------------------------
router.delete("/deleteemployee/:id",authenticateToken,employeeList.deleteEmployee);

module.exports=router