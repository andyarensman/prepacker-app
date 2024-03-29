const express = require('express')
const { getGear, getSingleGear, addGear, deleteSingleGear, editGear, getScrapedGear } = require('../controllers/closetController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

// require auth for all routes
router.use(requireAuth)

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

// POST scraped data
router.post('/scrape-gear', getScrapedGear)


module.exports = router