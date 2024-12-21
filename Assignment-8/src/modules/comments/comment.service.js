import commentModel from "../../DB/models/comment.model.js";
import { errorHandling } from "../../utils/errorHandling.js";


export const getAllComments = async (req, res, next) => {
    try {
        // const comments=await commentModel.findAll()
        const comments = await commentModel.create(req.body)
        return res.json({ msg: "ok", comments });
    } catch (error) {
        errorHandling(error, res)

    }
}