import ClienteRepository from '../repositories/cliente.repository.js'

async function getAutenticaUsuario (email, senha) {
  return await ClienteRepository.getAutenticaUsuario(email, senha)
}

export default {
  getAutenticaUsuario
}
