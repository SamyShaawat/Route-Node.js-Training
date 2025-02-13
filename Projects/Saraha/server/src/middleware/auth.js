
import jwt from "jsonwebtoken"
import userModel from "../DB/models/user.model.js"
import { asyncHandler } from "../utils/errorHandling.js"

export const authentication = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers
    const [prefix, token] = authorization.split(" ") || []
    if (!prefix || !token) {
        return next(new Error("Token not found"), { cause: 401 })
        // return res.status(401).json({ msg: "Token not found" })
    }
    let SIGNATURE_TOKEN = undefined

    if (prefix == "admin") {
        SIGNATURE_TOKEN = process.env.SIGNATURE_TOKEN_ADMIN
    } else if (prefix == "user") {
        SIGNATURE_TOKEN = process.env.SIGNATURE_TOKEN_USER
    } else {
        return next(new Error("Invalid token prefix"), { cause: 401 })
        // return res.status(401).json({ msg: "Invalid token prefix" })
    }
    const decoded = jwt.verify(token, SIGNATURE_TOKEN)

    if (!decoded?.id) {
        return next(new Error("Invalid token!"), { cause: 401 })
        // return res.status(401).json({ msg: "Invalid token!" })
    }
    const user = await userModel.findById(decoded.id)
    if (!user) {
        return next(new Error("User not found"), { cause: 404 })
        // return res.status(404).json({ msg: "User not found" })
    }
    req.user = user
    next()
})