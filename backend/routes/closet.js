const express = require('express')

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
router.post('/', (req, res) => {
  res.json({mssg: 'POST new closet item'})
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