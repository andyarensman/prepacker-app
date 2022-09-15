const express = require('express')
const { getChecklists, getSingleChecklist, addChecklist, deleteSingleChecklist, editChecklist } = require('../controllers/checklistController')

const router = express.Router()

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