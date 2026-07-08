const EmployeeService=require("../Services/EmployeeService");
const bcrypt=require("bcryptjs");

const create = async (req, res) => {
  try {
  
    const { first_name, last_name, email, phoneNumber, password, badge_number } = req.body;
    
  const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
    const cr = await EmployeeService.createEmployee(
      first_name, last_name, email, phoneNumber, hashedPassword, badge_number
    );
    res.status(201).json(cr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAll=async(req,res)=>{
    try{
        const get=await EmployeeService.getAllEmployees();
        res.json(get);
    }
     catch(err){
  res.status(500).json({
      error: err.message
    });
    }
}

const deleteEmployee=async(req,res)=>{
    try{
       const del=await EmployeeService.deleteE(req.params.id);
       res.json(del);
    }
     catch(err){
  res.status(500).json({
      error: err.message
    });
    }
}

const findEmployeeById=async(req,res)=>{
    try{
     const user=await EmployeeService.getById(req.params.id);
     res.json(user);
    }
     catch(err){
  res.status(500).json({
      error: err.message
    });
    }
}

const updateEmployee=async(req,res)=>{
    try{
      const user=await EmployeeService.update(req.params.id,req.body);
      res.json(user);
    }
     catch(err){
  res.status(500).json({
      error: err.message
    });
    }
}

module.exports={
create,
getAll,
deleteEmployee,
findEmployeeById,
updateEmployee
}