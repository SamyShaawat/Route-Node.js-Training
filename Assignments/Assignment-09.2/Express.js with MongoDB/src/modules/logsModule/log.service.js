import { db } from "../../DB/connectionDB.js";
import logModel from "../../DB/models/log.model.js";

import { ObjectId } from "mongodb";

export const createCappedCollection = async (req, res) => {
    try {
        await db.createCollection("logs", { capped: true, size: 1048576 });
        return res.status(201).json({ message: "'logs' collection created successfully" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updateBookID = async () => {
    await logModel.updateMany({ "book_id": { $type: "string" } }, [{ $set: { "book_id": { $toObjectId: "$book_id" } } }]);
}

export const addLog = async (req, res) => {
    try {
        const { book_id, action } = req.body;

        if (!book_id) {
            return res.status(400).json({ error: "book_id is required" });
        }
        if (!action) {
            return res.status(400).json({ error: "action is required" });
        }
        const result = await logModel.insertOne({ book_id, action });
        await updateBookID();
        return res.status(201).json({ message: "Log added to 'logs' collection", result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};