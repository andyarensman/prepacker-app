const mongoose = require('mongoose')

const Schema = mongoose.Schema
const checklistSchema = new Schema({
  checklist_name: { type: String, required: true },
  gear_items: [String], // will be array of _id's
  water_weight: Number, // in lb
  food_weight: Number,  // in lb
  checklist_notes: String,
  user_id: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Checklist', checklistSchema)