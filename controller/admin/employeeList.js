const employee = require("../../model/employee/employeeSchema");
const query = require("../../model/employee/emoloyeeQurey");
const user = require("../../model/testing/testing");


// ------------------ INSERT DATA ---------------------
insertData = async (req, res) => {
  const employee = new employee(req.body);
  try {
    await employee.save();
    res.send("Data inserted successfully");
  } catch (error) {
    res.send(error);
  }
};


// ------------------ FIND DATA ----------------------
findData = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const data = await query.findData({}, {}, skip, limit);
  res.send(data);
};


// ------------------ GET EMPLOYEE LIST ----------------------
getempList = async (req, res) => {
  const data = req.user;
  const empdata = await employee.find();
  res.render("pages/employee/emplist", { data, empdata });
};


// ------------------ GET EMPLOYEE DATA ----------------------
getemployeedata = async (req, res) => {

  try {
    let data, regex;
    const limit = parseInt(req.query.length) || 10;
    const skip = parseInt(req.query.start) || 0;
    const searchValue = req.query.search.value.trim();
    regex = new RegExp(searchValue, "i");

    if(searchValue == ""){
      data = await query.findData({}, {}, skip, limit);
      const recordTotal = await query.countData({});
      res.json({ 
        data: data,
        recordsTotal: recordTotal,
        recordsFiltered: recordTotal });
  }
  else
  {
    data = await query.findData(
      {
        $or: [
          { name: regex },
          { phone: regex },
          { city: regex },
          { gender: regex },
          { desgnation: regex },
          { salary:regex},
        ],
      },
      {},
      skip,
      limit
    );

    const recordTotal = await query.countData({});

    res.json({
      data: data,
      recordsTotal: recordTotal,
      recordsFiltered: recordTotal,
    });
  }
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// ------------------ VIEW EMPLOYEE DATA ----------------------
viewemployeedata = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const data = await employee.findById(id);
  res.render("pages/employee/viewemployeedata", { data, user});
};


// ------------------ UPDATE STATUS ----------------------
updatestatus = async (req, res) => {
  const id = req.params.id;
  const data = await employee.findById({_id:id});
  if (data.status == "active") {
    data.status = "inactive";
  } else {
    data.status = "active";
  }
  await data.save();
  res.json( {data});
};


// ------------------ UPDATE EMPLOYEE ----------------------
getupdateemployee = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const data = await employee.findById({_id:id});
  res.render("pages/employee/updateemployee", { data:data,user:user });
};


updateemployee = async (req, res) => {
  try {
    console.log(req.body);

    const updatedEmployee = await employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
console.log(updatedEmployee)
    res.redirect("/employee/getemplist");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



deleteemployee = async (req, res) => {
  await employee.deleteOne({_id:req.params.id});

}






module.exports = {
  insertData,
  findData,
  getempList,
  getemployeedata,
  viewemployeedata,
  updatestatus,
  getupdateemployee,
  updateemployee,
  deleteemployee,
};
