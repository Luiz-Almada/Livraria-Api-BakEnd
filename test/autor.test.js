const supertest = require('supertest');
const request = supertest('http://localhost:5678');

const payloadRequestAutor = {
	"nome": "Murilo1234567",
	"email": "m@m.com",
	"telefone": "99999999999"
}

const payloadRequestLivro = {
  "nome": "Livro do Murilo",
  "valor": "190",
  "estoque": 5,
  "autorId": 40
}
const payloadRequestCliente = {
  "nome": "luiz",
  "email": "l@l.com",
  "senha": "123",
  "telefone": "(61)99998888",
  "endereco": "inga"
}

const payloadResponseCliente = {
  "nome": "",
  "email": "",
  "senha": "",
  "telefone": "",
  "endereco": ""
}
const payloadRequestVenda = {
  "data": Date.now(),
  "clienteId": 0,
  "livroId": 0
}

let autorIdResponse = ""
let autorEmailResponse = ""
let livroIdResponse = ""
let clienteIdResponse = ""
let vendaIdResponse = ""

test('autor: 1) Criar um autor com dados de teste.', async () => {
  const res = await request.post('/autor').send(payloadRequestAutor).auth('admin', 'desafio-igti-nodejs')
  expect(res.status).toBe(200)
  autorIdResponse = JSON.parse(res.text).autorId
  autorEmailResponse = JSON.parse(res.text).email
})

test('autor: 2) Verificar se ele foi criado corretamente no banco de dados.,', async () => {
  //const res = await request.get(`/autor/${autorIdResponse}`).auth('franvieira@gmail.com', 'kW1bnjci70')
  const res = await request.get(`/autor/${autorIdResponse}`).auth('admin', 'desafio-igti-nodejs')
  expect(JSON.parse(res.text).email).toBe(autorEmailResponse)
})

test('livro: 3) Criar um livro com dados de teste para o autor criado anteriormente.', async () => {
  payloadRequestLivro.autorId = autorIdResponse
  const res = await request.post('/livro').send(payloadRequestLivro).auth('admin', 'desafio-igti-nodejs')
  expect(res.status).toBe(200)
  livroIdResponse = JSON.parse(res.text).livroId
})

test('livro: 4) Verificar se o livro foi criado corretamente.', async () => {
  //const res = await request.get(`/livro/${livroIdResponse}`).auth('franvieira@gmail.com', 'kW1bnjci70')
  const res = await request.get(`/livro/${livroIdResponse}`).auth('admin', 'desafio-igti-nodejs')
  expect(JSON.parse(res.text).livroId).toBe(livroIdResponse)
})

test('cliente: 5) Criar um cliente com dados de teste.', async () => {
  const res = await request.post('/cliente').send(payloadRequestCliente).auth('admin', 'desafio-igti-nodejs')
  expect(res.status).toBe(200)
  clienteIdResponse = JSON.parse(res.text).clienteId
  
  payloadResponseCliente.nome = JSON.parse(res.text).nome
  payloadResponseCliente.email = JSON.parse(res.text).email
  payloadResponseCliente.senha = JSON.parse(res.text).senha
  payloadResponseCliente.telefone = JSON.parse(res.text).telefone
  payloadResponseCliente.endereco = JSON.parse(res.text).endereco
})

test('livro: 6) Verificar se o cliente foi criado corretamente.', async () => {
  //const res = await request.get(`/cliente/${clienteIdResponse}`).auth('franvieira@gmail.com', 'kW1bnjci70')
  const res = await request.get(`/cliente/${clienteIdResponse}`).auth('admin', 'desafio-igti-nodejs')
  expect(JSON.parse(res.text).clienteId).toBe(clienteIdResponse)
})

test('Autenticado livro: 1) Buscar o livro criado utilizando os dados de login do usuário e verificar se o retorno é adequado.', async () => {
  const res = await request.get(`/livro/${livroIdResponse}`).auth(payloadResponseCliente.email, payloadResponseCliente.senha)
  //const res = await request.get(`/livro/${clienteIdResponse}`).auth('admin', 'desafio-igti-nodejs')
  expect(JSON.parse(res.text).autorId).toBe(payloadRequestLivro.autorId)
  expect(res.status).toBe(200)
})

test('Autenticado venda: 2) Criar uma venda para o usuário e livro criados para teste.', async () => {
  payloadRequestVenda.clienteId = clienteIdResponse
  payloadRequestVenda.livroId = livroIdResponse

  //const res = await request.post('/venda').send(payloadRequestVenda).auth(payloadResponseCliente.email, payloadResponseCliente.senha)
  const res = await request.post('/venda').send(payloadRequestVenda).auth('admin', 'desafio-igti-nodejs')
  expect(JSON.parse(res.text).clienteId).toBe(payloadRequestVenda.clienteId)
  expect(JSON.parse(res.text).livroId).toBe(payloadRequestVenda.livroId)
  vendaIdResponse = JSON.parse(res.text).vendaId
})

test('Autenticado venda: 3) Verificar se ela foi salva corretamente.', async () => {
  //const res = await request.get(`/venda/${vendaIdResponse}`).auth(payloadResponseCliente.email, payloadResponseCliente.senha)
  const res = await request.get(`/venda/${vendaIdResponse}`).auth('admin', 'desafio-igti-nodejs')
  expect(JSON.parse(res.text).vendaId).toBe(vendaIdResponse)
})

test('Tabelas: Deleta o conteúdo de todas as tabelas.', async () => {
  const res = await request.delete('/tabelas').auth('admin', 'desafio-igti-nodejs')
  expect(res.status).toBe(200)
})