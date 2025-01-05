import { db } from "../../DB/connectionDB.js";
import logModel from "../../DB/models/log.model.js";

import { ObjectId } from "mongodb";

const createCappedCollection = async () => {
    await db.createCollection("logs", { capped: true, size: 1048576 });
};

const updateBookID = async () => {
    await db.collection("logs").updateMany({ "book_id": { $type: "string" } }, [{ $set: { "book_id": { $toObjectId: "$book_id" } } }]);
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
        await createCappedCollection();
        const result = await logModel.insertOne({ book_id, action });
        await updateBookID();
        return res.status(201).json({ message: "Log added to 'logs' collection", result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};