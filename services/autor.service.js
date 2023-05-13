import AutorRepository from "../repositories/autor.repository.js";
import LivroRepository from "../repositories/livro.repository.js";

async function createAutor(autor) {
  return await AutorRepository.insertAutor(autor);
}

async function getAutores() {
  return await AutorRepository.getAutores();
}

async function getAutor(id) {
  return await AutorRepository.getAutor(id);
}

async function deleteAutor(id) {
  const livros = await LivroRepository.getLivrosByAutorId(id);
  if (livros.length > 0) {
    throw new Error("Não é possível excluir o autor pois ele tem livro associado.")
  }  
  await AutorRepository.deleteAutor(id);
}

async function updateAutor(autor) {
  return await AutorRepository.updateAutor(autor);
}

export default {
  createAutor,
  getAutores,
  getAutor,
  deleteAutor,
  updateAutor
}