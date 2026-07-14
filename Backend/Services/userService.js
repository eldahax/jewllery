const { User, UserRole, Role, Customer, sequelize } = require("../Models/index");


const createUser = async (
    first_name,
    last_name,
    email,
    hashedPassword
) => {

    const transaction = await sequelize.transaction();

    try {

        const userExists = await User.findOne({
            where: { email },
            transaction
        });

        if (userExists) {
            throw new Error("this user already exists");
        }


        const role = await Role.findOne({
            where: {
                role_name: "costumer"
            },
            transaction
        });


        if (!role) {
            throw new Error("this role doesnt exist");
        }


        const user = await User.create({
            first_name,
            last_name,
            email,
            password_hash: hashedPassword
        }, {
            transaction
        });



        await UserRole.create({
            user_id: user.user_id,
            role_id: role.role_id
        }, {
            transaction
        });



        await Customer.create({
            user_id: user.user_id
        }, {
            transaction
        });



        await transaction.commit();

        return user;


    } catch(error) {

        await transaction.rollback();

        throw error;
    }
};

const getAllUsers = async () => {
    const users = await User.findAll({
        attributes: ["user_id", "first_name", "last_name", "email"],
        include: [{
            model: Role,
            where: {
                role_name: 'costumer' 
            },
            attributes: [] 
        }]
    });
    return users;
};
const findUserByEmail = async (email) => {
    const user = await User.findOne({
        where: { email },
        include: [
            {
                model: Role,
                through: {
                    attributes: []
                },
                attributes: ["role_id", "role_name"]
            }
        ]
    });

    if (!user) {
        throw new Error("this user doesnt exist");
    }

    return user;
};


const findUserById = async (id) => {
    return await User.findByPk(id, {
        include: [
            {
                model: Role,
                through: {
                    attributes: []
                }
            }
        ]
    });
};

const checkEmail = async(email)=>{

    return await User.findOne({
        where:{
            email
        }
    });

};

const updateUser = async (id, data) => {

    const transaction = await sequelize.transaction();

    try {


        const user = await User.findByPk(id, {
            transaction
        });


        if (!user) {
            throw new Error("couldn't find user");
        }



        if (data.email && data.email !== user.email) {


            const emailExists = await User.findOne({
                where:{
                    email:data.email
                },
                transaction
            });



            if(emailExists){
                throw new Error("email is already in use");
            }

        }




        await user.update({

            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email

        }, {
            transaction
        });



        await transaction.commit();


        return user;



    } catch(error) {


        await transaction.rollback();

        throw error;
    }

};

const deleteUser = async (id) => {

    const transaction = await sequelize.transaction();


    try {


        const user = await User.findByPk(id, {
            transaction
        });


        if (!user) {
            throw new Error("this user doesnt exist");
        }




        await Customer.destroy({
            where:{
                user_id:id
            },
            transaction
        });




        await UserRole.destroy({
            where:{
                user_id:id
            },
            transaction
        });




        await User.destroy({
            where:{
                user_id:id
            },
            transaction
        });



        await transaction.commit();



        return {
            message:"user deleted successfully"
        };



    } catch(error) {


        await transaction.rollback();

        throw error;
    }

};

module.exports = {

    createUser,
    getAllUsers,
    findUserByEmail,
    findUserById,
    updateUser,
    deleteUser,
    checkEmail

};