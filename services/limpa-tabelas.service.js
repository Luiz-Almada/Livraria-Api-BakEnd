import limpaTabelasRepository from '../repositories/limpa-tabelas.repository.js'

async function deletaTabelas (id) {
  await limpaTabelasRepository.deletaTabelas()
}

export default {
  deletaTabelas
}
