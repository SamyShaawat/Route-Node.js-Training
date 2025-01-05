import { db } from "../../DB/connectionDB.js"; 
import bookModel from "../../DB/models/book.model.js";

import { ObjectId } from "mongodb";


export const addBook = async (req, res) => {
    try {
        const { title, author, year, genres } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        if (!author) {
            return res.status(400).json({ error: "Author is required" });
        }
        if (!year) {
            return res.status(400).json({ error: "Valid year is required" });
        }
        const result = await bookModel.insertOne({ title, author, year, genres });
        return res.status(201).json({ message: "Book added to 'books' collection", result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};