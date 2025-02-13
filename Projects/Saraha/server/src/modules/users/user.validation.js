import joi from "joi";
import { generalRules } from "../../utils/generalRules.js";


export const signUpSchema = {
    body: joi.object({
        name: joi.string().alphanum().min(3).max(10).messages({
            "string.min": "name is short"
        }),
        email: generalRules.email,
        password: generalRules.password,
        cPassword: joi.string().valid(joi.ref("password")),
        gender: joi.string().valid("Male", "Female"),
        phone: joi.string().regex(/^01[0125][0-9]{8}$/),
        role: joi.string()
        // id: generalRules.objectId 

        // object
        // cars: joi.object({
        //     model: joi.number().integer().positive().min(2000).max(2025),
        //     color: joi.string(),
        // }),

        // array of objects
        // car2: joi.array().items(joi.object({
        //     model: joi.number().integer().positive().min(2000).max(2025),
        //     color: joi.string(),
        // }))

    }).options({ presence: "required" }).with("password", "cPassword").with("email", "password"),

    headers: generalRules.headers.required(),

    // query: joi.object({
    //     flag: joi.number().required()
    // })
}