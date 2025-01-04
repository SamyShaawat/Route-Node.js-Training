import commentModel from "../../DB/models/comment.model.js";
import { errorHandling } from "../../utils/errorHandling.js";
import { sequelize } from "../../DB/connectionDB.js";
import userModel from "../../DB/models/user.model.js";
import Post from "../../DB/models/post.model.js";
import { Op } from "sequelize";


export const createBulkComments = async (req, res, next) => {
    try {
        const comments = await commentModel.bulkCreate(req.body);

        return res.status(201).json({ msg: "Comments created successfully." });
    } catch (error) {
        errorHandling(error, res);
    }
};

export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;

        const comment = await commentModel.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ msg: "Comment not found." });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({ msg: "You are not authorized to update this comment." });
        }

        comment.content = content;
        await comment.save();

        return res.status(200).json({ msg: "Comment updated successfully.", comment });
    } catch (error) {
        errorHandling(error, res);
    }
};

export const findOrCreateComment = async (req, res) => {
    try {
        const { postId, userId, content } = req.body;

        if (!postId || !userId || !content) {
            return res.status(400).json({ msg: "postId, userId, and content are required." });
        }

        const [comment, created] = await commentModel.findOrCreate({
            where: { postId, userId, content },
            defaults: { postId, userId, content },
        });

        if (created) {
            return res.status(201).json({ msg: "Comment created successfully.", comment });
        }

        return res.status(200).json({ msg: "Comment already exists.", comment });
    } catch (error) {
        errorHandling(error, res);
    }
};

export const searchComments = async (req, res) => {
    try {
        const { word } = req.query;

        if (!word) {
            return res.status(400).json({ msg: "The query parameter 'word' is required." });
        }

        const comments = await commentModel.findAndCountAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`,
                },
            },
            attributes: ["id", "postId", "userId", "content"],
        });
        if (comments.count == 0) {
            return res.status(404).json({ msg: "No comments found containing this word." });
        }

        return res.status(200).json({ msg: "Comments retrieved successfully.", count: comments.count, comments: comments.rows, });
    } catch (error) {
        errorHandling(error, res);
    }
};

export const getNewestComments = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ msg: "The postId parameter is required." });
        }

        const comments = await commentModel.findAll({
            where: { postId },
            order: [["createdAt", "DESC"]],
            limit: 3,
            attributes: ["id", "content", "createdAt"],
        });

        if (comments.length == 0) {
            return res.status(404).json({ msg: "No comments found for this post." });
        }

        return res.status(200).json({ msg: "Comments retrieved successfully.", comments });
    } catch (error) {
        errorHandling(error, res);
    }
};

export const getCommentDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "The comment ID is required." });
        }

        const comment = await commentModel.findOne({
            where: { id },
            include: [
                {
                    model: userModel,
                    attributes: ["id", "name", "email"],
                },
                {
                    model: Post,
                    attributes: ["id", "title", "content"],
                },
            ],
            attributes: ["id", "content", "createdAt"],
        });

        if (!comment) {
            return res.status(404).json({ msg: "Comment not found." });
        }

        return res.status(200).json({
            msg: "Comment retrieved successfully.",
            comment,
        });
    } catch (error) {
        errorHandling(error, res);
    }
};
