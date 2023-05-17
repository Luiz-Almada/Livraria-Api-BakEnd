import express from 'express'

import ClienteController from '../controllers/cliente.controller.js'
import autenticacaoService from '../services/autenticacao.service.js'
import auth from './auth.js'

const router = express.Router()

router.post('/', ClienteController.createCliente)
router.get('/', ClienteController.getClientes)
//router.get('/:id', await auth.authorize('admin', 'user'), ClienteController.getCliente)
router.get('/:id', ClienteController.getCliente)
router.delete('/:id', ClienteController.deleteCliente)
router.put('/', ClienteController.updateCliente)

export default router
