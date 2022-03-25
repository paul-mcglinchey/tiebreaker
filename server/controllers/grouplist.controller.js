const db = require('../models');
const GroupList = db.grouplist;

exports.createDefaultLists = async () => {
  GroupList.find({ default: true })
    .then(defaultList => {
      // default list exists
      if (defaultList) return;

      // default list doesn't exist yet
      const defaultGroupList = new GroupList({
        lists: [
          { 
            name: "employeeRole",
            values: [
              { short: "Staff", long: "Staff", colour: "#f43f5e" },
              { short: "Supervisor", long: "Supervisor", colour: "#3b82f6" },
              { short: "Manager", long: "Manager", colour: "#22c55e" }
            ]
          }
        ],
        createdBy: 'sys',
        updatedBy: 'sys',
        default: true
      });

      defaultGroupList.save(defaultGroupList)
        .catch(err => {
          throw new Error(err.message || `A problem occurred while adding the default lists.`);
        })
    })
    .catch(err => {
      throw new Error(err.message || `A problem occurred while finding the default lists.`)
    })
}

exports.getDefaultLists = async (req, res) => {
  GroupList.find({ default: true }, { _id: 1 })
    .then(defaultLists => {
      res.status(200).send({ defaultList: defaultLists })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `A problem occurred while fetching the default list set.`
      })
    })
}