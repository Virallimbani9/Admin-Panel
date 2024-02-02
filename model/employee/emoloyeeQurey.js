const employee = require("./employeeSchema")

const findData = async (obj,sortObj,skip,limit) =>{
    // console.log("obj",obj)
    const data = await employee.find(obj).sort(sortObj).skip(skip).limit(limit).lean();
    // console.log(data)
    return data;
}

const countData = async (obj) =>{
    const data = await employee.find(obj).countDocuments(obj);
    // console.log(data)
    return data;
}


module.exports = {
    findData,
    countData
}

