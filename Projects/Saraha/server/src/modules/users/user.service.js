import userModel from "../../DB/models/user.model.js"
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../../service/sendEmails.js"
import { asyncHandler } from "../../utils/errorHandling.js"
import { eventEmitter } from "../../utils/sendEmail.event.js"



export const signUp = asyncHandler(async (req, res, next) => {
    const { name, email, password, cPassword, phone, gender } = req.body;

    // Check if email exists
    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
        return next(new Error("Email already exists."), { cause: 409 });
    }

    // Hash password
    const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));

    // Encrypt phone
    const encryptPhone = CryptoJS.AES.encrypt(phone, process.env.SECRET_KEY).toString();

    eventEmitter.emit("sendEmail", { email });

    // Create user
    const user = await userModel.create({ name, email, password: hashPassword, phone: encryptPhone, gender });

    return res.status(201).json({ msg: "done", user });
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.params

    if (!token) {
        return next(new Error("Token not found"), { cause: 404 })
        // return res.status(400).json({ msg: "Token not found" })
    }
    const decoded = jwt.verify(token, process.env.SIGNATURE_CONFIRMATION)
    if (!decoded?.email) {
        return next(new Error("Invalid token payload"), { cause: 404 })
        // return res.status(400).json({ msg: "Invalid token payload" })
    }
    const user = await userModel.findOneAndUpdate(
        { email: decoded.email, confirmed: false },
        { confirmed: true }
    )
    if (!user) {
        return next(new Error("User not found or already confirmed"), { cause: 400 })
        // return res.status(400).json({ msg: "User not found or already confirmed" })
    }
    return res.status(201).json({ msg: "done" })

})

export const signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    // check email 
    const user = await userModel.findOne({ email, confirmed: true })
    if (!user) {
        return next(new Error("Email not exists or not confirmed yet"), { cause: 400 })
        // return res.status(400).json({ msg: "Email not exists or not confirmed yet " })
    }

    const match = bcrypt.compareSync(password, user.password)
    if (!match) {
        return next(new Error("Invalid Password"), { cause: 400 })
        // return res.status(400).json({ msg: "Invalid Password" })
    }

    const token = jwt.sign(
        { email, id: user._id },
        user.role == "user" ? process.env.SIGNATURE_TOKEN_USER : process.env.SIGNATURE_TOKEN_Admin,
        { expiresIn: "3h" }
    )

    return res.status(201).json({ msg: "done", token })

})

export const getProfile = asyncHandler(async (req, res, next) => {
    // const phone = CryptoJS.AES.decrypt(user.phone, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return res.status(201).json({ msg: "done", user: req.user });

})