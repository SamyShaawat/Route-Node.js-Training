import { db } from "../../DB/connectionDB.js";
import bookModel from "../../DB/models/book.model.js";

import { ObjectId } from "mongodb";

export const createBookCollection = async (req, res) => {
    try {
        await db.createCollection("books", { validator: { $and: [{ "title": { $exists: true } }, { "title": { $ne: "" } }] } });
        return res.status(201).json({ message: "'books' collection created successfully" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

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

export const createBookIndex = async (req, res) => {
    try {
        await bookModel.createIndex({ title: 1 });
        return res.status(201).json({ message: "Index created on 'title' field in 'books' collection" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const insertManyBooks = async (req, res) => {
    try {
        const { books } = req.body;
        if (!books || books.length < 3) {
            return res.status(400).json({ error: "Provide at least three books" });
        }
        const result = await bookModel.insertMany(books);
        return res.status(201).json({ message: "Books added successfully", result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const updateBookYear = async (req, res) => {
    try {
        const { title } = req.params;
        const { year } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title parameter is required" });
        }
        if (!year) {
            return res.status(400).json({ error: "Year is required in the body" });
        }

        const result = await bookModel.updateOne({ title }, { $set: { year } });

        if (result.modifiedCount == 0) {
            return res.status(404).json({ error: "Book not found or already up to date" });
        }

        return res.status(200).json({ message: `Book with title '${title}' updated successfully`, result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const findBookByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({ error: "Title query parameter is required" });
        }

        const book = await bookModel.findOne({ title });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book found", book });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const findBooksByYearRange = async (req, res) => {
    try {
        const { from, to } = req.query;
        const fromYear = Number(from);
        const toYear = Number(to);

        const books = await bookModel.find({ year: { $gte: fromYear, $lte: toYear } }).toArray();

        return res.status(200).json(books);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const findBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.query;

        if (!genre) {
            return res.status(400).json({ error: "Genre query parameter is required." });
        }

        const books = await bookModel.find({ genres: genre }).toArray();

        if (books.length == 0) {
            return res.status(404).json({ message: `No books found with genre: ${genre}` });
        }

        return res.status(200).json(books);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
