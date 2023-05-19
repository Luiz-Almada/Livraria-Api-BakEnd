import express from 'express'

import LimpaTabelasController from '../controllers/limpa-tabelas.controller.js'
import { realizadaAutenticacao } from "../middleware/authenticated.js";
import { can, is } from "../middleware/authorize.js";

const router = express.Router()

router.delete('/', realizadaAutenticacao(), is('admin'), LimpaTabelasController.deletaTabelas)

export default router
