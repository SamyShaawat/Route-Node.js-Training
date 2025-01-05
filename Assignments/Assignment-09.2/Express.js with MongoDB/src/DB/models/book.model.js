import { db } from "../connectionDB.js";

const bookModel = db.collection('books');

export default bookModel;