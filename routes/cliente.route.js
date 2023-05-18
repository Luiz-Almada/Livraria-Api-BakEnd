import express from 'express'

import ClienteController from '../controllers/cliente.controller.js'
import { realizadaAutenticacao } from "../middleware/authenticated.js";
import { can, is } from "../middleware/authorize.js";

const router = express.Router()

router.post('/', realizadaAutenticacao(), is('admin'), ClienteController.createCliente)
router.get('/', realizadaAutenticacao(), is('admin'), ClienteController.getClientes)
router.get('/:id', realizadaAutenticacao(), is('admin'), ClienteController.getCliente)
router.delete('/:id', realizadaAutenticacao(), is('admin'), ClienteController.deleteCliente)
router.put('/', realizadaAutenticacao(), can(), ClienteController.updateCliente)

export default router
