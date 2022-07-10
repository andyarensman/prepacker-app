const Gear = require('../models/gearModel')
const mongoose = require('mongoose')

// get all gear
const getGear = async (req, res) => {
  // TODO: may need to change the sort later or do it in front end
  const gear = await Gear.find({}).sort({createdAt: -1})

  res.status(200).json(gear)
}


// get single gear
const getSingleGear = async (req, res) => {
  const { id } = req.params

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gear'})
  }

  const gear = await Gear.findById(id)

  if (!gear) {
    return res.status(404).json({error: 'No such gear'})
  }

  res.status(200).json(gear)
}


// add new gear
const addGear = async (req, res) => {
  const {
    gear_name, 
    weight, 
    price, 
    notes, 
    website, 
    image_url
  } = req.body

  // forgotten Field
  let emptyFields = []

  //! If there are more required fields, add them here with more if checks
  if(!gear_name) {
    emptyFields.push('gear_name')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields', emptyFields})
  }

  // add doc to db
  try {
    const gear = await Gear.create({
        gear_name, 
        weight, 
        price, 
        notes, 
        website, 
        image_url
      })
    res.status(200).json(gear)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


// delete gear
const deleteSingleGear = async (req, res) => {
  const { id } = req.params

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gear'})
  }

  const gear = await Gear.findOneAndDelete({_id: id})

  if (!gear) {
    return res.status(404).json({error: 'No such gear'})
  }

  res.status(200).json(gear)

}

// edit gear
const editGear = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gear'})
  }

  const gear = await Gear.findOneAndUpdate({_id: id }, {
    ...req.body
  })

  if (!gear) {
    return res.status(404).json({error: 'No such gear'})
  }

  res.status(200).json(gear)
}


module.exports = {
  getGear,
  getSingleGear,
  addGear,
  deleteSingleGear,
  editGear
}