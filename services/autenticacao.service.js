import ClienteRepository from '../repositories/cliente.repository.js'

function autentica (email, senha) {
  const usuarioAutenticado = ClienteRepository.autentica(email, senha);
  return usuarioAutenticado;
}

async function getAutorizacao (email) {
  return await ClienteRepository.getAutorizacao(email)
}

export default {
  autentica,
  getAutorizacao
}
