const express = require('express')
const { getChecklists, getSingleChecklist, addChecklist, deleteSingleChecklist, editChecklist } = require('../controllers/checklistController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// GET all checklist items
router.get('/', getChecklists)

// GET single checklist item
router.get('/:id', getSingleChecklist)

// POST single checklist item
router.post('/', addChecklist)

// DELETE single checklist item
router.delete('/:id', deleteSingleChecklist)

// UPDATE single checklist item
router.patch('/', editChecklist)


module.exports = router