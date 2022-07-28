const mongoose = require('mongoose')

const Schema = mongoose.Schema
const gearSchema = new Schema({
  gear_name: {type: String, required: true},
  weight: Number,
  price: Number,
  category: {type: String, required: true},
  notes: String,
  website: Schema.Types.Mixed,
  image_url: Schema.Types.Mixed
}, { timestamps: true })

module.exports = mongoose.model('Gear', gearSchema)