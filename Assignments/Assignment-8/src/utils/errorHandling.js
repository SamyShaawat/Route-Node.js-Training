export const errorHandling = (error, res) => {
    if (error?.name == 'SequelizeValidationError') {
        const errorDetails = error.errors.map((err) => {
            return { message: err.message, field: err.path }
        })
        return res.json({ msg: "validation error", errorDetails });

    }
    return res.json({ msg: "error", error, message: error.message,stack: error.stack });
}