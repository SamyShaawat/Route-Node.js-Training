import userModel from "../../DB/models/user.model.js";

import { ObjectId } from "mongodb";

export const addUser = async (req, res,) => {
    try {
        const users = await userModel.insertOne(req.body)
        return res.json({ msg: "ok", users });
    } catch (error) {
        return res.json({ error: error.message })
    }
}

export const getUsers = async (req, res,) => {
    try {
        const users = await userModel.find().toArray();
        return res.json({ msg: "ok", users });
    } catch (error) {
        return res.json({ error: error.message })
    }
}


export const updateUser = async (req, res,) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const users = await userModel.updateOne({ _id: new ObjectId(id) }, { $set: { name: name } });
        return res.json({ msg: "ok", users });
    } catch (error) {
        return res.json({ error: error.message })
    }
}

export const getUpdateUser = async (req, res,) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const users = await userModel.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { name: name } }, { returnDocument: "after" });
        return res.json({ msg: "ok", users });
    } catch (error) {
        return res.json({ error: error.message })
    }
}