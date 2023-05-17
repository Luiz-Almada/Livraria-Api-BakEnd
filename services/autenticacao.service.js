import ClienteRepository from '../repositories/cliente.repository.js'

async function autentica (email, senha) {
  const usuarioAutenticado = await ClienteRepository.autentica(email, senha);
  return usuarioAutenticado;
}

async function getAutorizacao (email) {
  return await ClienteRepository.getAutorizacao(email)
}

export default {
  autentica,
  getAutorizacao
}
