import VendaService from '../services/venda.service.js'
async function createVenda (req, res, next) {
  let venda = req.body

  try {
    if (!venda.data || !venda.clienteId || !venda.livroId) {
      throw new Error('Data, Cliente ID e Livro ID são obrigatórios.')
    }
    venda = await VendaService.createVenda(venda)
    res.send(venda)
    logger.info(`POST /venda - ${JSON.stringify(venda)}`)
  } catch (err) {
    next(err)
  }
}

async function getVendas (req, res, next) {
  try {
    res.send(await VendaService.getVendas(req.query.clienteId, req.query.livroId, req.query.autorId))
    logger.info('GET /venda')
  } catch (err) {
    next(err)
  }
}

async function getVenda (req, res, next) {
  try {
    res.send(await VendaService.getVenda(req.params.id))
    logger.info('GET /venda')
  } catch (err) {
    next(err)
  }
}

async function deleteVenda (req, res, next) {
  try {
    await VendaService.deleteVenda(req.params.id)
    res.end()
    logger.info('DELETE /venda')
  } catch (err) {
    next(err)
  }
}

async function updateVenda (req, res, next) {
  let venda = req.body

  try {
    if (!venda.vendaId || !venda.valor || !venda.data || !venda.clienteId || !venda.livroId) {
      throw new Error('Venda Id, Valor, Data, Cliente ID e Livro ID são obrigatórios.')
    }

    venda = await VendaService.updateVenda(venda)
    res.send(venda)
    logger.info(`PUT /venda - ${JSON.stringify(venda)}`)
  } catch (err) {
    next(err)
  }
}

export default {
  createVenda,
  getVendas,
  getVenda,
  deleteVenda,
  updateVenda
}
