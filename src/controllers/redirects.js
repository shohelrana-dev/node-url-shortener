//depndencies
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { Direction } = require('../utilities/db');
const _pr = require('../utilities/promiseResolver');

let entryValidator = body('url').isURL().withMessage('Please Provide valid URL');

router.post('/api/v1/redirects', entryValidator, async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
    }

    let userId = req.user.id;
    let destination = req.body.url;
    let timestamp = Date.now() / 1000;

    let hash = parseInt(`${userId}${timestamp}`).toString(32);

    const [error, _direction] = await _pr(Direction.create({ userId, destination, hash }));
    if (error) {
        return res.status(400).json({ errors: { common: error.message } });
    }
    return res.status(201).json({
        success: true,
        direction: _direction.dataValues,
        message: 'Direction created successfully', hash
    });
});

router.get('/api/v1/redirects', async (req, res) => {
    const [error, redirects] = await _pr(Direction.findAll({ where: { userId: req.user.id } }));
    return res.status(200).json(redirects);
});

router.get('/:hash', async (req, res, next) => {
    let urlHash = req.params.hash;
    let [error, hashDirection] = await _pr(Direction.findOne({
        where: {
            'hash': urlHash
        }
    }));
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    if (hashDirection) {
        return res.redirect(301, hashDirection.dataValues.destination);
    }
    else {
        next();
    }
});

module.exports = router;