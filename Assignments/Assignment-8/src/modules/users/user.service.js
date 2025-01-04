import userModel from "../../DB/models/user.model.js";
import { errorHandling } from "../../utils/errorHandling.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;
        if (await userModel.findOne({ where: { email } })) {
            return res.status(400).json({ msg: "Email already exists." });
        }
        const newUser = userModel.build({ name, email, role, password, });
        await newUser.save();
        return res.status(201).json({ msg: "User created successfully.", user: newUser });
    } catch (error) {
        errorHandling(error, res);
    }
};


export const createOrUpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, password } = req.body;

        let user = await userModel.findByPk(id);
        if (user) {
            await user.update({ name, email, role, password }, { skipValidation: true });
        } else {
            user = userModel.build({ id, name, email, role, password });
            await user.save({ validate: false });
        }
        return res.status(200).json({ message: "User created or updated successfully.", user: user });
    } catch (error) {
        errorHandling(error, res);
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ msg: "Email query parameter is required." });
        }

        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        return res.status(200).json({ msg: "User found.", user });
    } catch (error) {
        errorHandling(error, res);
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findByPk(id, {
            attributes: { exclude: ['role'] }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        return res.status(200).json({ msg: "User found.", user });
    } catch (error) {
        errorHandling(error, res);
    }
};
