const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name: String,
  foundationDate: Date,
  gender: String,
  description: String,
  photo: String,
  songs: [{type: Schema.Types.ObjectId, ref: 'sing' }],
  savedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const GroupModel = mongoose.model('groups', GroupSchema)

module.exports = GroupModel
