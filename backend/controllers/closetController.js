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

}

// edit gear
const editGear = async (req, res) => {

}


module.exports = {
  getGear,
  getSingleGear,
  addGear,
  deleteSingleGear,
  editGear
}