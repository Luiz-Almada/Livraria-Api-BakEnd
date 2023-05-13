import ClienteService from '../services/cliente.service.js';
//import { check, validationResult } from 'express-validator';

async function createCliente(req, res, next) {
  let cliente = req.body;

  try {
    if (!cliente.nome || !cliente.email || !cliente.senha || !cliente.telefone || !cliente.endereco) {
      throw new Error("Nome, Email, Senha, Telefone e Endereço são obrigatórios.")
    }
/*
    check('nome', 'Nome deve ser informado').notEmpty(),
    check('CPF', 'CPF deve ser informado').notEmpty(),
    check('valor', 'O valor deve ser um número').notEmpty().isFloat(),
    check('parcelas', 'O número de parcelas deve ser um número inteiro').notEmpty().isInt(),    
*/
    cliente = await ClienteService.createCliente(cliente);
    res.send(cliente);
    logger.info(`POST /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function getClientes(req, res, next) {
  try {
    res.send(await ClienteService.getClientes());
    logger.info("GET /cliente");
  } catch (err) {
    next(err);
  }
}

async function getCliente(req, res, next) {
    try {
    res.send(await ClienteService.getCliente(req.params.id));
    logger.info("GET /cliente");
  } catch (err) {
    next(err);
  }
}

async function deleteCliente(req, res, next) {
  try {
    await ClienteService.deleteCliente(req.params.id);
    res.end();
    logger.info("DELETE /cliente");
  } catch (err) {
    next(err);
  }
}

async function updateCliente(req, res, next) {
  let cliente = req.body;

  try {
    if (!cliente.clienteId || !cliente.nome || !cliente.email || !cliente.senha || !cliente.telefone || !cliente.endereco) {
      throw new Error("Cliente Id, Nome, Email, Senha, Telefone e Endereço são obrigatórios.")
    }

    cliente = await ClienteService.updateCliente(cliente);
    res.send(cliente);
    logger.info(`PUT /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente
}