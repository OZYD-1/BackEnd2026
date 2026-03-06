import { getAllUsers } from "../models/user.Model.js";

export const getAllUsersController = async (req, res) => {
    try {
        const users =  await getAllUsers()
        if(users.length === 0) {
            return res.status(200).json({message: "no users", users:[]})
        }
        return res.status(200).json({message: "users fetched seccesfully", users})
    }
    catch(err) {
        return res.status(500).json({message: "internal server error"})
    }
}