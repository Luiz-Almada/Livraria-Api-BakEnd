import express from 'express'
import LivroController from '../controllers/livro.controller.js'
import { realizadaAutenticacao } from "../middleware/authenticated.js";
import { can, is } from "../middleware/authorize.js";

const router = express.Router()

router.post('/', realizadaAutenticacao(), is('admin'), LivroController.createLivro)
router.put('/', realizadaAutenticacao(), is('admin'), LivroController.updateLivro)
router.delete('/:id', realizadaAutenticacao(), is('admin'), LivroController.deleteLivro)
router.get('/', realizadaAutenticacao(), can(), LivroController.getLivros)
router.get('/info', realizadaAutenticacao(), is('admin'), LivroController.getLivrosInfo)
router.get('/:id', realizadaAutenticacao(), can(), LivroController.getLivro)
router.post('/info', realizadaAutenticacao(), is('admin'), LivroController.createLivroInfo)
router.put('/info', realizadaAutenticacao(), is('admin'), LivroController.updateLivroInfo)
router.delete('/info/:id', realizadaAutenticacao(), is('admin'), LivroController.deleteLivroInfo)
router.post('/avaliacao', realizadaAutenticacao(), can(), LivroController.createAvaliacao)
router.delete('/:id/avaliacao/:index', realizadaAutenticacao(), is('admin'), LivroController.deleteAvaliacao)

export default router
