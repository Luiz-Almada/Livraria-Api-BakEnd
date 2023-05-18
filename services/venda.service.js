import VendaRepository from '../repositories/venda.repository.js'
import ClienteRepository from '../repositories/cliente.repository.js'
import LivroRepository from '../repositories/livro.repository.js'

async function createVenda (venda) {
  if (venda.clienteId != global.usuarioId && global.usuarioId > 0) {
    throw new Error('O cliente não pode registrar venda (comprar) em nome de outro cliente!')
  }  
  let error = ''
  if (!await ClienteRepository.getCliente(venda.clienteId)) {
    error = 'O clienteId informado não existe.'
  }
  const livro = await LivroRepository.getLivro(venda.livroId)
  if (!livro) {
    error += 'O livroId informado não existe.'
  }
  if (error) {
    throw new Error(error)
  }
  if (livro.estoque > 0) {
    venda.valor = livro.valor
    venda = await VendaRepository.insertVenda(venda)
    livro.estoque--
    LivroRepository.updateLivro(livro)
    return venda
  } else {
    throw new Error('O livro informado não possui estoque.')
  }
}

async function getVendas (clienteId, livroId, autorId) {
  if (clienteId != global.usuarioId && global.usuarioId > 0) {
    throw new Error('O cliente só pode consultar suas próprias vendas (compras)!')
  }
  if (clienteId) {
    return await VendaRepository.getVendasByClienteId(clienteId)
  }
  if (livroId) {
    return await VendaRepository.getVendasByLivroId(livroId)
  }
  if (autorId) {
    return await VendaRepository.getVendasByAutorId(autorId)
  }
  return await VendaRepository.getVendas()
}

async function getVenda (id) {
  return await VendaRepository.getVenda(id)
}

async function deleteVenda (id) {
  const venda = await VendaRepository.getVenda(id)
  if (venda) {
    const livro = await LivroRepository.getLivro(venda.livroId)
    await VendaRepository.deleteVenda(id)
    livro.estoque++
    LivroRepository.updateLivro(livro)
  } else {
    throw new Error('O Venda ID informado não existe.')
  }
}

async function updateVenda (venda) {
  let error = ''
  if (!await ClienteRepository.getCliente(venda.clienteId)) {
    error = 'O clienteId informado não existe.'
  }
  if (!await LivroRepository.getLivro(venda.livroId)) {
    error += 'O livroId informado não existe.'
  }
  if (error) {
    throw new Error(error)
  }
  return await VendaRepository.updateVenda(venda)
}

export default {
  createVenda,
  getVendas,
  getVenda,
  deleteVenda,
  updateVenda
}
