import express from 'express'
import LivroController from '../controllers/livro.controller.js'

const router = express.Router()

router.post('/', LivroController.createLivro)
router.put('/', LivroController.updateLivro)
router.delete('/:id', LivroController.deleteLivro)
router.get('/', LivroController.getLivros)
router.get('/info', LivroController.getLivrosInfo)
router.get('/:id', LivroController.getLivro)
router.post('/info', LivroController.createLivroInfo)
router.put('/info', LivroController.updateLivroInfo)
router.delete('/info/:id', LivroController.deleteLivroInfo)
router.post('/avaliacao', LivroController.createAvaliacao)
router.delete('/:id/avaliacao/:index', LivroController.deleteAvaliacao)

export default router
