import userModel from "../../DB/models/user.model.js";
import { errorHandling } from "../../utils/errorHandling.js";


export const getAllUsers = async (req, res, next) => {
    try {
        // const users=await userModel.findAll()
        const users = await userModel.create(req.body)
        return res.json({ msg: "ok", users });
    } catch (error) {
        errorHandling(error, res)

    }
}