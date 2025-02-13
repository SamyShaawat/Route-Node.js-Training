

export const validation = (schema) => {
    // console.log(schema);
    // console.log(Object.keys(schema));

    return (req, res, next) => {
        let validationResult = [];
        for (const key of Object.keys(schema)) {
            const validationError = schema[key].validate(req[key], { abortEarly: false });

            if (validationError?.error) {
                validationResult.push(validationError.error.details);
            }

        }
        if (validationResult.length > 0) {
            return res.status(400).json({ msg: "Validation Error: ", errors: validationResult });
        }
        next();

    }
}