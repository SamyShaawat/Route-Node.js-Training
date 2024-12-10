import userModel from "../../DB/models/user.model.js";


const errorHandling = (error, res) => {
    if (error.name == 'SequelizeValidationError') {
        const errorDetails = error.errors.map((err) => {
            return { message: err.message, field: err.path }
        })
        return res.json({ msg: "validastion error", errorDetails });

    }
    return res.json({ msg: "error", error });
}

export const gerUsers = async (req, res, next) => {
    try {
        // const users=await userModel.findAll()
        const users = await userModel.create(req.body)
        return res.json({ msg: "ok", users });
    } catch (error) {
        errorHandling(error, res)

    }
}