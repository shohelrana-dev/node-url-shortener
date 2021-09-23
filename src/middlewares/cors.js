//cors origin
module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTION");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token");
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    }
    next()
};