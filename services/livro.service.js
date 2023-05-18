import LivroRepository from '../repositories/livro.repository.js'
import AutorRepository from '../repositories/autor.repository.js'
import VendaRepository from '../repositories/venda.repository.js'
import LivroInfoRepository from '../repositories/livroInfo.repository.js'

async function createLivro (livro) {
  if (await AutorRepository.getAutor(livro.autorId)) {
    return await LivroRepository.insertLivro(livro)
  }
  throw new Error('O autorId informado não existe.')
}

async function getLivros (autorId) {

  if (!autorId && global.usuarioId > 0) {
    throw new Error('O usuário só pode consultar livros de um autor específico!')
  }

  if (autorId) {
    return await LivroRepository.getLivrosByAutorId(autorId)
  }
  return await LivroRepository.getLivros()
}

async function getLivro (id) {
  const livro = await LivroRepository.getLivro(id)
  // livro.info = await LivroInfoRepository.getLivroInfo(parseInt(id));
  return livro
}

async function deleteLivro (id) {
  const vendas = await VendaRepository.getVendasByLivroId(id)

  if (vendas.length > 0) {
    throw new Error('Não é possível excluir o livro pois ele tem vendas.')
  }
  await LivroRepository.deleteLivro(id)
}

async function updateLivro (livro) {
  return await LivroRepository.updateLivro(livro)
}

async function createLivroInfo (livroInfo) {
  await LivroInfoRepository.createLivroInfo(livroInfo)
}

async function updateLivroInfo (livroInfo) {
  await LivroInfoRepository.updateLivroInfo(livroInfo)
}

async function createAvaliacao (avaliacao, livroId) {
  await LivroInfoRepository.createAvaliacao(avaliacao, livroId)
}

async function deleteAvaliacao (livroId, index) {
  await LivroInfoRepository.deleteAvaliacao(parseInt(livroId), index)
}

async function getLivrosInfo (livroId, index) {
  return await LivroInfoRepository.getLivrosInfo(parseInt(livroId), index)
}

async function deleteLivroInfo (livroId) {
  await LivroInfoRepository.deleteLivroInfo(livroId)
}

export default {
  createLivro,
  getLivros,
  getLivro,
  deleteLivro,
  updateLivro,
  createLivroInfo,
  updateLivroInfo,
  createAvaliacao,
  deleteAvaliacao,
  getLivrosInfo,
  deleteLivroInfo
}
