const { body } = require('express-validator')
const dns = require('dns').promise
const validator = require('validator');

exports.addPasswordValidation = [
    body("site")
        .notEmpty().withMessage("Site name is required")
        .custom((value) => {
            const domain = value.replace(/^https?:\/\//, '').split('/')[0];
            if (!validator.isFQDN(domain)) {
                throw new Error("Enter a valid domain name like google.com");
            }
            return true;
        }),

    body("username")
        .notEmpty().withMessage("Username required")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

    body("password")
        .notEmpty().withMessage("password required")
        .isLength({ min: 6 }).withMessage("password name must be at least 6 characters")
]

exports.updatePasswordValidation = [
    body("site")
        .notEmpty().withMessage("Site name is required")
        .custom((value) => {
            const domain = value.replace(/^https?:\/\//, '').split('/')[0];
            if (!validator.isFQDN(domain)) {
                throw new Error("Enter a valid domain name like google.com");
            }
            return true;
        }),

    body("username")
        .notEmpty().withMessage("Username required")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

    body("password")
        .notEmpty().withMessage("password required")
        .isLength({ min: 6 }).withMessage("Site name must be at least 6 characters")
]