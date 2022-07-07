const express = require('express')
const Gear = require('../models/gearModel')

const router = express.Router()

// GET all closet items
router.get('/', (req, res) => {
  res.json({mssg: 'GET all closet items'})
})

// GET single closet item
router.get('/:id', (req, res) => {
  res.json({mssg: 'GET single closet item'})
})

// POST single closet item
router.post('/', async (req, res) => {
  console.log(req.body)
  const {
    gear_name, 
    weight, 
    price, 
    notes, 
    website, 
    image_url
  } = req.body

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
})

// DELETE single closet item
router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE a closet item'})
})

// UPDATE single closet item
router.patch('/', (req, res) => {
  res.json({mssg: 'UPDATE closet item'})
})




module.exports = router