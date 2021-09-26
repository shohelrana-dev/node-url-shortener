//promise resolver function
function _pr(promise) {
    return new Promise(function (resolve, reject) {
        promise
            .then(res => {
                resolve([null, res]);
            })
            .catch(err => {
                resolve([err, null]);
            });
    });
}

module.exports = _pr;