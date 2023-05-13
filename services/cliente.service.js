import ClienteRepository from "../repositories/cliente.repository.js";
import VendaRepository from "../repositories/venda.repository.js";

async function createCliente(cliente) {
  return await ClienteRepository.insertCliente(cliente);
}

async function getClientes() {
  return await ClienteRepository.getClientes();
}

async function getCliente(id) {
  return await ClienteRepository.getCliente(id);
}

async function deleteCliente(id) {
  const vendas = await VendaRepository.getVendasByClienteId(id);

  if (vendas.length > 0) {
    throw new Error("Não é possível excluir o cliente pois ele tem vendas associadas.")
  }
  await ClienteRepository.deleteCliente(id);
}

async function updateCliente(cliente) {
  return await ClienteRepository.updateCliente(cliente);
}

export default {
  createCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente
}