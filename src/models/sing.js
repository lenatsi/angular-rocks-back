const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SingSchema = new Schema({
  name: String,
  link: String,
  artist: { type: Schema.Types.ObjectId, ref: 'groups' },
  savedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const SingModel = mongoose.model('sing', SingSchema)
module.exports = SingModel
