import { Request, Response, NextFunction } from "express";
import { Schema } from "joi"; // Import Joi Schema type

export function validateRequest(req: Request, res: Response, next: NextFunction, schema: Schema): void {
    const options = {
        abortEarly: false, // Include all errors
        allowUnknown: true, // Ignore unknown keys
        stripUnknown: true, // Remove unknown keys
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        return next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
    } else {
        req.body = value; // Overwrite request body with validated data
        next();
    }
}
