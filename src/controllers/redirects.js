//depndencies
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { Direction } = require('../utilities/db');

let entryValidator = body('url').isURL().withMessage('Please Provide valid URL');

router.post('/api/v1/redirects', entryValidator, (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
    }

    let userId = req.user.id;
    let destination = req.body.url;
    let timestamp = Date.now() / 1000;

    let hash = parseInt(`${userId}${timestamp}`).toString(32);

    Direction.create({ userId, destination, hash })
        .then(data => res.status(200).json({
            error: false,
            message: 'Direction created',
            hash
        }))
        .catch(err => res.status(400).json({
            error: true,
            message: err.message
        }));
});

router.get('/api/v1/redirects', entryValidator, (req, res) => {
    Direction.findAll({
        where: { userId: req.user.id },
        limit: 10
    }).then(directions => {
        res.status(200).json(directions);
    })
});

module.exports = router;