import userModel from "../../DB/models/user.model.js"
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password, cPassword, phone, gender } = req.body

        // check password match or not
        if (password !== cPassword) {
            return res.status(400).json({ msg: "Passwords do not match." })
        }

        // check email exist or not 
        const emailExist = await userModel.findOne({ email })
        if (emailExist) {
            return res.status(409).json({ msg: "Email already exists." })
        }
        // hash password
        const hashPassword = bcrypt.hashSync(password, 12)
        // console.log(hashPassword);

        // encrypt phone
        const encryptPhone = CryptoJS.AES.encrypt(phone, 'SamyEncrypt').toString();

        // create a new user
        const user = await userModel.create({ name, email, password: hashPassword, phone: encryptPhone, gender })

        return res.status(201).json({ msg: "done", user })
    } catch (error) {
        return res.status(500).json({ msg: "Error: ", message: error.message, stack: error.stack, error });

    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "Invalid Email" })
        }

        const match = bcrypt.compareSync(password, user.password)
        if (!match) {
            return res.status(400).json({ msg: "invalid Password" })
        }

        const token = jwt.sign({ email }, "secretKeySamy", { expiresIn: "1h" })

        return res.status(201).json({ msg: "done", token })
    } catch (error) {
        return res.status(500).json({ msg: "Error: ", message: error.message, stack: error.stack, error });

    }
}

export const getProfile = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(400).json({ msg: "token not found" })
        }
        const decoded = jwt.verify(authorization, "secretKeySamy")
        const user = await userModel.findOne({ email: decoded.email }).select("-password").lean()
        if (!user) {
            return res.status(400).json({ msg: "user not found" })
        }
        const phone = CryptoJS.AES.decrypt(user.phone, "SamyEncrypt").toString(CryptoJS.enc.Utf8);
        return res.status(201).json({ msg: "done", ...user, phone })
    } catch (error) {
        return res.status(500).json({ msg: "Error: ", message: error.message, stack: error.stack, error });

    }
}