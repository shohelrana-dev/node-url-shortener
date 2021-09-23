//dependencies
const { User } = require('../utilities/db');
const { validate } = require('../utilities/passwords');
const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { app_secret } = require('../config.json');
const errorHandler = require('../middlewares/error_handler');

const loginValidator = [
    body('email').isEmail().withMessage('Please provide your email.'),
    body('password').isLength({ min: 1 }).withMessage('Please provide your password.'),
];

router.post('/login', loginValidator, (req, res, next) => {
    const errors = (validationResult(req));

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let { email, password } = req.body;

    User.findOne({ where: { email } })
        .then(user => {
            if (!user) {
                return res.status(201).json({ error: true, message: 'User not found' });
            }

            let { id, name, email } = user;
            let [salt, hash] = user.password.split('.');
            let valid = validate(password, salt, hash);
            if (valid) {
                let token = jwt.sign({ id, name, email }, app_secret);
                return res.status(200).json({ token, error: false, user: { id, name, email } });
            }
            return res.status(201).json({ error: true, message: 'Password incorrect' })
        })
});

module.exports = router;