import Venda from '../models/venda.model.js'
import Autor from '../models/autor.model.js'
import Livro from '../models/livro.model.js'
import Cliente from '../models/cliente.model.js'

async function deletaTabelas () {
  try {
    await Venda.destroy({where: {}})
    await Livro.destroy({where: {}})
    await Autor.destroy({where: {}})
    await Cliente.destroy({where: {}})
  } catch (err) {
    throw err
  }
}

export default {
  deletaTabelas
}