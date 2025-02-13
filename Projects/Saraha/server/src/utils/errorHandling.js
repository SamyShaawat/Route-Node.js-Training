
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            return next(error);
            // return res.status(500).json({ msg: "server error: ", message: error.message, stack: error.stack, error })
        })
    }
}

export const globalErrorHandler = (err, req, res, next) => {
    // console.log(err["cause"]);
    return res.status((err["cause"] || 500).json({
        message: err.message,
        stack: err.stack
    }))

}