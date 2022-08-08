const mongoose = require('mongoose')

const Schema = mongoose.Schema
const checklistSchema = new Schema({
  checklist_name: {type: String, required: true},
  gear_items: [String], // will be array of _id's
  checklist_notes: String
}, { timestamps: true })

module.exports = mongoose.model('Checklist', checklistSchema)