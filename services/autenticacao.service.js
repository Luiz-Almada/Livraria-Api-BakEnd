import ClienteRepository from '../repositories/cliente.repository.js'

async function getAutenticacao (email) {
  return await ClienteRepository.getAutenticacao(email);
}

async function getAutorizacao (email) {
  return await ClienteRepository.getAutorizacao(email)
}

export default {
  getAutenticacao,
  getAutorizacao
}
