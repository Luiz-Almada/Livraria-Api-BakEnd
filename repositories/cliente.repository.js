import Cliente from '../models/cliente.model.js'

async function insertCliente (cliente) {
  try {
    return await Cliente.create(cliente)
  } catch (err) {
    throw err
  }
}

async function getClientes () {
  try {
    return await Cliente.findAll({
      attributes: { exclude: 'senha' }
    })
  } catch (err) {
    throw err
  }
}

async function getCliente (id) {
  try {
    return await Cliente.findByPk(id, {
      attributes: { exclude: 'senha' }
    })
  } catch (err) {
    throw err
  }
}

async function deleteCliente (id) {
  try {
    await Cliente.destroy({
      where: {
        clienteId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function updateCliente (cliente) {
  try {
    await Cliente.update(cliente, {
      where: {
        clienteId: cliente.clienteId
      }
    })
    return await getCliente(cliente.clienteId)
  } catch (err) {
    throw err
  }
}

function autentica (email, senha) {
  try {
    const usuarioAutenticado = Cliente.findOne(
      {
        attributes: [
        'email', 'senha'
        ],
        where:
        {
          email,
          senha
        }
      }
    )

    if (usuarioAutenticado !== null ) {
      return usuarioAutenticado;
    }
    return null;
  } catch (err) {
    throw err
  }
}

async function getAutorizacao (email) {
  try {
    const usuarioAutenticado = await Cliente.findOne(
      {
        where:
        {
          email
        }
      }
    )

    if (usuarioAutenticado !== null) {
      return usuarioAutenticado;
    }
    return null;
  } catch (err) {
    throw err
  }
}

export default {
  insertCliente,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente,
  autentica,
  getAutorizacao
}
