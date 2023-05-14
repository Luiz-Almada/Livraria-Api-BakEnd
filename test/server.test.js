const supertest = require('supertest');
const request = supertest('http://localhost:5678');

test('Servidor na porta 5678,', async () => {
  //const resposta = await request.get('/cliente').auth('admin', 'desafio-igti-nodejs')
  const resposta = await request.get('/cliente').auth('franvieira@gmail.com', 'kW1bnjci70')
  expect(resposta.status).toBe(200)
})