const { Schema } = require('mongoose');

const GroupEntitySchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  rotas: [{
    type: Schema.Types.ObjectId,
    ref: 'Rota'
  }],
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'Client'
  }],
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }],
})

module.exports = GroupEntitySchema