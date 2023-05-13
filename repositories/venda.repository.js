import connect from "./db.js";
import Venda from "../models/venda.model.js";
import Livro from "../models/livro.model.js";
import Cliente from "../models/cliente.model.js";
import Autor from "../models/autor.model.js";

async function insertVenda(venda) {
  try {
    return await Venda.create(venda);
  } catch (err) {
    throw err;
  }
}

async function getVendas() {
  try {
    return await Venda.findAll({
      include: [
        {
          model: Livro,
        },
        {
          model: Cliente,
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}
async function getVendasByClienteId(clienteId) {
  try {
    return await Venda.findAll({
      where: {
        clienteId,
      },  
      include: [
        {
          model: Cliente,
          attributes: { exclude: 'senha' }
        },
        {
          model: Livro,
          include: [
            {
              model: Autor,
            }
          ]
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByLivroId(livroId) {
  try {
    return await Venda.findAll({
      where: {
        livroId,
      },
      include: [
        {
          model: Cliente,
          attributes: { exclude: 'senha' }
        },
        {
          model: Livro,
          include: [
            {
              model: Autor,
            }
          ]
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByAutorId(autorId) {
  try {
    return await Venda.findAll({
        include: [
        {
          model: Cliente,
          attributes: { exclude: 'senha' }
        },
        {
          model: Livro,
          where: {
            autorId
          },
          include: [
            {
              model: Autor,
            }
          ]
        }
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getVenda(id) {
  try {
    return await Venda.findByPk(id, {
      include: [
        {
          model: Cliente,
        },
        {
          model: Livro,
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function deleteVenda(id) {
  try {
    await Venda.destroy({
      where: {
        vendaId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function updateVenda(venda) {
  try {
    await Venda.update(
      {
        valor: venda.valor,
        data: venda.data,
        clienteId: venda.clienteId,
      },
      {
        where: {
          vendaId: venda.vendaId,
        },
      }
    );
    return await getVenda(venda.vendaId);
  } catch (err) {
    throw err;
    a;
  }
}

export default {
  insertVenda,
  getVendas,
  getVenda,
  getVendasByClienteId,
  getVendasByLivroId,
  getVendasByAutorId,
  updateVenda,
  deleteVenda,
};
