const { body } = require('express-validator');

exports.registerValidation = [
    body('username')
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please enter a valid email"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

//     body("password")
//   .notEmpty().withMessage("Password is required")
//   .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
//   .matches(/[a-z]/).withMessage("Password must contain a lowercase letter")
//   .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter")
//   .matches(/\d/).withMessage("Password must contain a number")
//   .matches(/[\W_]/).withMessage("Password must contain a special character");

];

exports.loginValidation = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Enter a valid email"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

exports.forgotValidation = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Enter a valid email"),
];

exports.resetPasswordValidation = [
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
]

exports.changePasswordValidation = [
    body("oldPassword")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

    body("newPassword")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
]

