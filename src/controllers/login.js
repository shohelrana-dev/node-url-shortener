//dependencies
const { User } = require('../utilities/db');
const { generate } = require('../utilities/passwords');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const loginValidator = [
    body('email').isEmail().withMessage('Please provide your email.'),
    body('password').isLength({ min: 1 }).withMessage('Please provide your password.'),
];

router.post('/login', loginValidator, (req, res, next) => {
    const errors = (validationResult(req));

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // let chunks = generate(req.body.password);
    // let password = `${chunks.salt}.${chunks.hash}`;

    let { email, password } = req.body;

    User.findOne({ email })
        .then(data => {
            res.status(200).json({ error: false, message: 'User found', data: data })
        })
        .catch(err => {
            res.status(400).json({ error: true, message: err.message })
        });
});

module.exports = router;