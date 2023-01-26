const Checklist = require('../models/checklistModel')
const mongoose = require('mongoose')

// get all checklists
const getChecklists = async (req, res) => {
  const user_id = req.user._id

  const checklist = await Checklist.find({ user_id }).sort({createdAt: -1})

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
    water_weight,
    food_weight,
    checklist_name, 
    gear_items,
    checklist_notes
  } = req.body

  // forgotten Field
  let emptyFields = []

  // If there are more required fields, add them here with more if checks
  if(!checklist_name) {
    emptyFields.push('checklist_name')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields', emptyFields})
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const checklist = await Checklist.create({
        water_weight,
        food_weight,
        checklist_name, 
        gear_items,
        checklist_notes,
        user_id
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

// edit checklist(s)
const editChecklist = async (req, res) => {
  const { multi } = req.body
  // console.log(multi)

  // For Multi Edit
  if (multi) {
    const { listUpdates } = req.body

    if (listUpdates.length > 0) {
      let resArray = []
      for (const checklistObj of listUpdates) {
        const newChecklist = await Checklist.findOneAndUpdate({_id: checklistObj.checklist_id }, {
          gear_items: [...checklistObj.updated_checklist]
        }, {new: true})
  
        //! Do I need a case if it doesn't work?
        if (newChecklist) {
          resArray.push(newChecklist)
        }
      }
      // console.log(resArray)
      res.status(200).json(resArray)
    }
  }
  
  // For Single Edit
  if (!multi) {
    const {
      id,
      water_weight,
      food_weight,
      checklist_name, 
      gear_items,
      checklist_notes
    } = req.body

    // forgotten Field
    let emptyFields = []

    // If there are more required fields, add them here with more if checks
    if(!checklist_name) {
      emptyFields.push('checklist_name')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all required fields', emptyFields})
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such checklist'})
    }
  
    const checklist = await Checklist.findOneAndUpdate({_id: id }, {
      water_weight,
      food_weight,
      checklist_name, 
      gear_items,
      checklist_notes
    }, {new: true})
  
    if (!checklist) {
      return res.status(404).json({error: 'No such checklist'})
    }
  
    res.status(200).json(checklist)
  }

}


module.exports = {
  getChecklists,
  getSingleChecklist,
  addChecklist,
  deleteSingleChecklist,
  editChecklist
}