const db = require('../models');
const GroupList = db.grouplist;

exports.getDefaultLists = async (req, res) => {
  GroupList.findById('622f88cb0b1ef9aeed041347')
    .then(defaultLists => res.status(200).send({ defaultList: defaultLists }))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `A problem occurred while fetching the default list set`
      })
    })
}