import express from 'express'
import VendaController from '../controllers/venda.controller.js'
import { realizadaAutenticacao } from "../middleware/authenticated.js";
import { can, is } from "../middleware/authorize.js";

const router = express.Router()

router.post('/', realizadaAutenticacao(), can(), VendaController.createVenda)
router.get('/', realizadaAutenticacao(), can(), VendaController.getVendas)
router.get('/:id', realizadaAutenticacao(), is('admin'), VendaController.getVenda)
router.delete('/:id', realizadaAutenticacao(), is('admin'), VendaController.deleteVenda)
router.put('/', realizadaAutenticacao(), is('admin'), VendaController.updateVenda)

export default router
