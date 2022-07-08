const express = require('express')
const { getGear, getSingleGear, addGear } = require('../controllers/closetController')


const router = express.Router()

// GET all closet items
router.get('/', getGear)

// GET single closet item
router.get('/:id', getSingleGear)

// POST single closet item
router.post('/', addGear)

// DELETE single closet item
router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE a closet item'})
})

// UPDATE single closet item
router.patch('/', (req, res) => {
  res.json({mssg: 'UPDATE closet item'})
})




module.exports = router