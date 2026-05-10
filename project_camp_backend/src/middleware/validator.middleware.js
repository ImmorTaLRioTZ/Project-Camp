import { validationResult } from "express-validator";
import { APIError } from "../utils/api-error.js";

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map((err) => {
        extractedErrors.push({
            [err.path]: err.msg,
        });
    });
    return next(new APIError(422, "Received invalid data", extractedErrors));
};
