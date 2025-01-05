import authorModel from "../../DB/models/author.model.js";

import { ObjectId } from "mongodb";

export const createAuthorCollection = async (req, res) => {
    try {
        const { name, nationality } = req.body;
        await authorModel.insertOne({ name, nationality });
        return res.status(201).json({ message: "'authors' collection created successfully" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addAuthor = async (req, res) => {
    try {
        const { name, nationality } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        if (!nationality) {
            return res.status(400).json({ error: "Nationality is required" });
        }
        const result = await authorModel.insertOne({ name, nationality });
        return res.status(201).json({ message: "Author added to 'authors' collection", result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
