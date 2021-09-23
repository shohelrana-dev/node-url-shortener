//dependencies
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { User } = require('../utilities/db');
const { generate } = require('../utilities/passwords');

const signupValidator = [
    body('name').isLength({ min: 1 }).withMessage('Please provide your name.'),
    body('email').isEmail().withMessage('Please provide a valid email.'),
    body('password').isLength({ min: 6 }).withMessage('The password should be min 6 character'),
    body('password').isLength({ max: 20 }).withMessage('The password should be max 6 character')
];

router.post('/signup', signupValidator, (req, res, next) => {
    const errors = (validationResult(req));

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let chunks = generate(req.body.password);
    let password = `${chunks.salt}.${chunks.hash}`;

    let { name, email } = req.body;

    User.create({ name, email, password })
        .then(data => res.status(200).json({
            error: false,
            message: 'User created'
        }))
        .catch(err => res.status(400).json({
            error: true,
            message: err.message
        }));
});

module.exports = router;