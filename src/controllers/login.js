//dependencies
const { User } = require('../utilities/db');
const { validate } = require('../utilities/passwords');
const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { app_secret } = require('../config.json');
const _pr = require('../utilities/promiseResolver');

const loginValidator = [
    body('email').isLength({ min: 1 }).withMessage('Email address is required.')
        .isEmail().withMessage('Please provide your email.').trim(),
    body('password').isLength({ min: 1 }).withMessage('Password is required.').trim(),
];

router.post('/login', loginValidator, async (req, res) => {
    const errors = (validationResult(req));

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    let { email, password } = req.body;

    const [error, user] = await _pr(User.findOne({ where: { email } }));
    if (error || !user) {
        return res.status(401).json({ errors: { common: { msg: 'User not found' } } });
    }

    let userInfo = {
        id: user.id,
        name: user.name,
        email: user.email
    };
    let [salt, hash] = user.password.split('.');
    let valid = validate(password, salt, hash);
    if (valid) {
        let token = jwt.sign(userInfo, app_secret);
        return res.status(200).json({ token, success: true, user: userInfo });
    }
    return res.status(401).json({ errors: { common: { msg: 'Password incorrect' } } });
});

module.exports = router;