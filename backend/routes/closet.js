const express = require('express')
const { getGear, getSingleGear, addGear, deleteSingleGear, editGear } = require('../controllers/closetController')


const router = express.Router()

// GET all closet items
router.get('/', getGear)

// GET single closet item
router.get('/:id', getSingleGear)

// POST single closet item
router.post('/', addGear)

// DELETE single closet item
router.delete('/:id', deleteSingleGear)

// UPDATE single closet item
router.patch('/:id', editGear)




module.exports = router