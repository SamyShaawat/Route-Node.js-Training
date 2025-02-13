
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            return res.status(500).json({ msg: "server error: ", message: error.message, stack: error.stack, error })
        })
    }
}