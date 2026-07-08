const UserService=require("../Services/userService");
const bcrypt=require("bcryptjs");
const db=require("../Models/index");

const login=async(req,res)=>{
   try{
     const{email,password}=req.body;
    
     const user=await UserService.findUserByEmail(email);
     if(!user){
         return res.status(400).json({
        error: "Invalid username or password"
      });
     }
     const psw=await bcrypt.compare(password,user.password_hash);
     if(!psw){
            return res.status(400).json({
        error:"Invalid credencials"
      });
     }
     res.status(200).json({ 
            message: "Login successful",
            user: { id: user.id, email: user.email, first_name: user.first_name } 
        });
   }
catch(err){
    res.status(500).json({
      error: err.message
    });
}
}

const signup = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const existingUser = await UserService.checkEmail(email);

        if (existingUser) {
            return res.status(400).json({
                error: "A user with this email already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserService.createUser(
            first_name,
            last_name,
            email,
            hashedPassword
        );

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const getAllUsers=async(req,res)=>{
    try{
    const users=await UserService.getAllUsers();
    res.json(users);
    }
    catch(err){
    res.status(500).json({
      error: err.message
    });
}
}

const findUserById=async(req,res)=>{
    try{
     const find=await UserService.findUserById(req.params.id);
     res.json(find);
    }
    catch(err){
    res.status(500).json({
      error: err.message
    });
}
}

const updateUser = async(req,res)=>{
    try{

        const user = await UserService.updateUser(
            req.params.id,
            req.body
        );

        res.json(user);

    }catch(err){
        res.status(500).json({
            error: err.message
        });
    }
};

const deleteUser=async(req,res)=> {
    try{
     const del=await UserService.deleteUser(req.params.id);
     res.json(del)
    }
    catch(err){
    res.status(500).json({
      error: err.message
    });
}
}

module.exports = {
    login,
    signup,
    getAllUsers,
    findUserById,
    updateUser,
    deleteUser
};