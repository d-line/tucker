import { NextFunction, Request, Response } from 'express';
import { ValidationChain, body, validationResult } from 'express-validator';

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

const loginValidator = [
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters long'),
];

const signupValidator = [
  ...loginValidator,
];

const subscribeValidator = [
  body('url')
    .trim()
    .isURL()
    .withMessage('Feed URL is required'),
];

export { validate, signupValidator, loginValidator, subscribeValidator };
