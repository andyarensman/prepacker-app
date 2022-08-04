const Checklist = require('../models/checklistModel')
const mongoose = require('mongoose')

// get all checklists
const getChecklists = async (req, res) => {
  const checklist = await Checklist.find({}).sort({createdAt: -1})

  res.status(200).json(checklist)
}

// get single checklist
const getSingleChecklist = async (req, res) => {
  const { id } = req.params

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such checklist'})
  }

  const checklist = await Checklist.findById(id)

  if (!checklist) {
    return res.status(404).json({error: 'No such checklist'})
  }

  res.status(200).json(checklist)
}

// add new checklist
const addChecklist = async (req, res) => {
  const {
    checklist_name, 
    gear_items
  } = req.body

  // forgotten Field
  let emptyFields = []

  // If there are more required fields, add them here with more if checks
  if(!checklist_name) {
    emptyFields.push('checklist_name')
  }
  if(!gear_items) {
    emptyFields.push('gear_items')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields', emptyFields})
  }

  // add doc to db
  try {
    const checklist = await Checklist.create({
        checklist_name, 
        gear_items
      })
    res.status(200).json(checklist)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete checklist
const deleteSingleChecklist = async (req, res) => {
  const { id } = req.params

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such checklist'})
  }

  const checklist = await Checklist.findOneAndDelete({_id: id})

  if (!checklist) {
    return res.status(404).json({error: 'No such checklist'})
  }

  res.status(200).json(checklist)
}

// edit checklist
const editChecklist = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such checklist'})
  }

  const checklist = await Checklist.findOneAndUpdate({_id: id }, {
    ...req.body
  })

  if (!checklist) {
    return res.status(404).json({error: 'No such checklist'})
  }

  res.status(200).json(checklist)
}


module.exports = {
  getChecklists,
  getSingleChecklist,
  addChecklist,
  deleteSingleChecklist,
  editChecklist
}