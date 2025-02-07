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
        const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS))
        // console.log(hashPassword);

        // encrypt phone
        const encryptPhone = CryptoJS.AES.encrypt(phone, process.env.SIGNATURE).toString();

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
            return res.status(400).json({ msg: "Invalid Password" })
        }

        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" })

        return res.status(201).json({ msg: "done", token })
    } catch (error) {
        return res.status(500).json({ msg: "Error: ", message: error.message, stack: error.stack, error });

    }
}

export const getProfile = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ msg: "Token is required" })
        }
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY)

        if(!decoded?.id){
            return res.status(401).json({ msg: "Invalid token" })
        }
        const user = await userModel.findOne({ email: decoded.email }).select("-password").lean()
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        const phone = CryptoJS.AES.decrypt(user.phone, process.env.SIGNATURE).toString(CryptoJS.enc.Utf8);
        return res.status(201).json({ msg: "done", ...user, phone })
    } catch (error) {
        return res.status(500).json({ msg: "Error: ", message: error.message, stack: error.stack, error });

    }
}