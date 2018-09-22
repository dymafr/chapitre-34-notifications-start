const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSchema = Schema({
  details: Schema.Types.Mixed
})

const Sub = mongoose.model('Sub', subSchema);

module.exports = Sub;