import Post from "../../DB/models/post.model.js";
import userModel from "../../DB/models/user.model.js";
import Comment from "../../DB/models/comment.model.js";
import { errorHandling } from "../../utils/errorHandling.js";


export const addPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        const newPost = new Post({title,content,userId,});
        await newPost.save();

        return res.status(201).json({msg: "Post created successfully.", post: newPost});
    } catch (error) {
        errorHandling(error, res);
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }

        if (post.userId != userId) {
            return res.status(403).json({ msg: "You are not authorized to delete this post." });
        }

        await post.destroy();

        return res.status(200).json({ msg: "Post deleted." });
    } catch (error) {
        errorHandling(error, res);
    }
};

export const getPostDetails = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ["id", "title"], 
            include: [
                {
                    model: userModel,
                    attributes: ["id", "name"], 
                },
                {
                    model: Comment,
                    attributes: ["id", "content"], 
                },
            ],
        });

        return res.status(200).json(posts);
    } catch (error) {
        errorHandling(error, res);
    }
};