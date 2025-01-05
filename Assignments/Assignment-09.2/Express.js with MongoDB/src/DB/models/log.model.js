import { db } from "../connectionDB.js";

const logModel = db.collection('logs');

export default logModel;