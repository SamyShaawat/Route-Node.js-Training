import { db } from "../connectionDB.js";

const userModel = db.collection('users');

export default userModel;