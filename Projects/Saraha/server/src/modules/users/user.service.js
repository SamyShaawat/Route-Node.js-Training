import userModel from "../../DB/models/user.model.js"
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../../service/sendEmails.js"

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
        const encryptPhone = CryptoJS.AES.encrypt(phone, process.env.SECRET_KEY).toString();

        // send email to confirm
        const token = jwt.sign({ email }, process.env.SIGNATURE_CONFIRMATION)
        const link = `http://localhost:3000/users/confirmEmail/${token}`
        // or const link = `https://localhost:3000/users/confirmEmail/email?${token}`

        const emailSender = await sendEmail(email, "Confirm Email", `<a href='${link}' >Confirm me</a>`)
        if (!emailSender) {
            return res.status(500).json({ msg: "Failed to send Email" });
        }
        // create a new user
        const user = await userModel.create({ name, email, password: hashPassword, phone: encryptPhone, gender })

        return res.status(201).json({ msg: "done", user })
    } catch (error) {
        return res.status(500).json({ msg: "Error: ", message: error.message, stack: error.stack, error });

    }
}

export const confirmEmail = async (req, res, next) => {
    try {
        const { token } = req.params

        if (!token) {
            return res.status(400).json({ msg: "Token not found" })
        }
        const decoded = jwt.verify(token, process.env.SIGNATURE_CONFIRMATION)
        if (!decoded?.email) {
            return res.status(400).json({ msg: "Invalid token payload" })
        }
        const user = await userModel.findOneAndUpdate(
            { email: decoded.email, confirmed: false},
            {confirmed: true}
        )
        if (!user) {
            return res.status(400).json({ msg: "User not found or already confirmed" })
        }
        return res.status(201).json({ msg: "done" })
    } catch (error) {
        return res.status(500).json({ msg: "Error: ", message: error.message, stack: error.stack, error });

    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        // check email 
        const user = await userModel.findOne({ email, confirmed: true})
        if (!user) {
            return res.status(400).json({ msg: "Email not exists or not confirmed yet " })
        }

        const match = bcrypt.compareSync(password, user.password)
        if (!match) {
            return res.status(400).json({ msg: "Invalid Password" })
        }

        const token = jwt.sign(
            { email, id: user._id },
            user.role == "user" ? process.env.SIGNATURE_TOKEN_USER : process.env.SIGNATURE_TOKEN_Admin,
            { expiresIn: "3h" }
        )

        return res.status(201).json({ msg: "done", token })
    } catch (error) {
        return res.status(500).json({ msg: "Error: ", message: error.message, stack: error.stack, error });

    }
}

export const getProfile = async (req, res, next) => {
    try {
        //const phone = CryptoJS.AES.decrypt(user.phone, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        return res.status(201).json({ msg: "done", user: req.user });
    } catch (error) {
        return res.status(500).json({ msg: "Error: ", message: error.message, stack: error.stack, error });

    }
}