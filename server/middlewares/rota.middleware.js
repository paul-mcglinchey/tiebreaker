const checkRotaIdExists = (req, res, next) => {
    if (!req.params.rotaId) return res.status(400).send({ message: 'RotaID must be set.' });
    next();
}

const rotaMiddleware = {
    checkRotaIdExists
};

module.exports = rotaMiddleware;