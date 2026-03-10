import Airplane from "../models/userM.Model.js";

export const getAllUsersController = async (req, res) => {
    try {
        const users =  await Airplane.find()
        if(users.length === 0) {
            return res.status(200).json({message: "no users", users:[]})
        }
        return res.status(200).json({message: "users fetched seccesfully", users})
    }
    catch(err) {
        return res.status(500).json({message: "internal server error"})
    }
}

export const getUserByIdController = async (req, res) => {
    const userId = req.params.id;
    try {
        const user =  await Airplane.findById(userId)
        if(!user) {
            return res.status(404).json({message: "user not found"})
        }
        return res.status(200).json({message: "user fetched seccesfully", user})
    }
    catch(err) {
        return res.status(500).json({message: "internal server error"})
    }
}

export const updateUserController = async (req, res) => {
    const userId = req.params.id;
    const { phone_number, address, birth_date, gender, has_passport } = req.body;
    try {
        const updatedUser = await Airplane.findByIdAndUpdate(userId, { phone_number, address, birth_date, gender, has_passport }, { new: true });
        if(!updatedUser) {
            return res.status(404).json({message: "user not found"})
        }
        // update user logic here
        return res.status(200).json({message: "user updated seccesfully", user})
    }
    catch(err) {
        return res.status(500).json({message: "internal server error"})
    }
}