const db = require('../models');
const Rota = db.rota;

const checkRotaIdExists = (req, res, next) => {
  if (!(req.params.rotaId || req.query.rotaId)) return res.status(400).send({ message: 'RotaID must be set.' });
  next();
}

const checkUserAccessToRota = (accessRequired) => {
  return (req, res, next) => {

    const rotaId = req.body.rotaId || req.params.rotaId || req.query.rotaId;

    Rota.findById(rotaId)
      .then((data) => {
        if (data.accessControl) {
          if (data.accessControl[accessRequired].includes(req.auth.userId)) {
            next();
          } else {
            return res.status(403).send({
              message: `User with ID ${req.auth.userId} not properly authorized to perform that action on rota with ID ${rotaId}.`
            });
          }
        }
      })
      .catch(err => {
        return res.status(500).send({ message: err | `An unexpected error occurred while checking user access.` });
      })
  }
}

const rotaMiddleware = {
  checkRotaIdExists,
  checkUserAccessToRota
};

module.exports = rotaMiddleware;