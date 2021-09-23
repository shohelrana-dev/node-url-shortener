module.exports = (err, req, res, next) => {
    return res.status(400).json({
        error: true,
        message: err.message
    });
}