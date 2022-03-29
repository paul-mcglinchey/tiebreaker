const db = require('../models');
const GroupList = db.grouplist;

exports.createDefaultLists = () => {
  GroupList.findOne({ default: true })
    .then(defaultList => {
      // default list exists
      if (defaultList) return;

      // default lists don't exist yet
      const defaultGroupList = new GroupList({
        lists: [
          { 
            name: "employeeRole",
            description: "Employee Role",
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
        .then(defaultList => defaultList)
        .catch(err => {
          throw new Error(err.message || `A problem occurred while adding the default lists.`);
        })
    })
    .catch(err => {
      throw new Error(err.message || `A problem occurred while finding the default lists.`)
    })
}

exports.getDefaultLists = async (req, res) => {
  GroupList.findOne({ default: true })
    .then(defaultLists => {
      if (!defaultLists) {
        // Populate the default lists
        return this.createDefaultLists();
      }

      return defaultLists;
    })
    .then(defaultLists => {
      res.status(200).send({ defaultLists })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `A problem occurred while fetching the default list set.`
      })
    })
}

exports.updateDefaultLists = async (req, res) => {
  GroupList.findByIdAndUpdate(req.body._id, req.body)
    .then(() => {
      return res.status(200).send({ message: `Successfully updated the default lists.`})
    })
    .catch(err => {
      return res.status(500).send({ message: err || `A problem occurred updating the default lists.`})
    })
}