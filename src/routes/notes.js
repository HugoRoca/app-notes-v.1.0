const router = require('express').Router()
const { isAuthenticated } = require('../helpers/auth')
const NoteController = require('../controllers/notes.controller')

const noteController = new NoteController()

router.get('/notes/add', isAuthenticated, noteController.renderNewNote)
router.get('/notes', isAuthenticated, noteController.allNotes)
router.get('/notes/edit/:id', isAuthenticated, noteController.renderEdit)
router.post('/notes/new-note', isAuthenticated, noteController.save)
router.put('/notes/edit-note/:id', isAuthenticated, noteController.edit)
router.delete('/notes/delete/:id', isAuthenticated, noteController.delete)

module.exports = router
