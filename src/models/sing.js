const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SingSchema = new Schema({
    name: String,
    link: String,
    artist: {type: Schema.Types.ObjectId, ref: 'groups'},
})

const SingModel = mongoose.model('Sing', SingSchema)
module.exports = SingModel