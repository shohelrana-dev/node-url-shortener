//dependencies
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { User } = require('../utilities/db');
const { generate } = require('../utilities/passwords');
const _pr = require('../utilities/promiseResolver');

const signupValidator = [
    body('name').isLength({ min: 1 }).withMessage('Please provide your name.'),
    body('email').isEmail().withMessage('Please provide a valid email.'),
    body('password').isLength({ min: 6 }).withMessage('The password should be min 6 character'),
    body('password').isLength({ max: 20 }).withMessage('The password should be max 20 character')
];

router.post('/signup', signupValidator, async (req, res) => {
    const errors = (validationResult(req));

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    let chunks = generate(req.body.password);
    let password = `${chunks.salt}.${chunks.hash}`;

    let { name, email } = req.body;

    const [error, user] = await _pr(User.create({ name, email, password }));

    if (error) {
        return res.status(424).json({ errors: { common: { msg: 'The email address already exists' } } });
    }
    return res.status(201).json({ success: true, message: 'User signup successfully' });
});

module.exports = router;