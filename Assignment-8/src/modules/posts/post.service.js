import postModel from "../../DB/models/post.model.js";
import { errorHandling } from "../../utils/errorHandling.js";


export const getAllPosts = async (req, res, next) => {
    try {
        // const posts=await postModel.findAll()
        const posts = await postModel.create(req.body)
        return res.json({ msg: "ok", posts });
    } catch (error) {
        errorHandling(error, res)

    }
}