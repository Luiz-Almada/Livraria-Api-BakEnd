import './env.js'
import express from 'express'
import cors from 'cors'
import winston from 'winston'
import basicAuth from 'express-basic-auth'

import clientesRouter from './routes/cliente.route.js'
import autoresRouter from './routes/autor.route.js'
import livrosRouter from './routes/livro.route.js'
import vendasRouter from './routes/venda.route.js'
import autenticacaoService from './services/autenticacao.service.js'

const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label} ${level} ${message}] `
})
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'livraria-api.log' })
  ],
  format: combine(label({ label: 'livraria-api' }), timestamp(), myFormat)
})

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

async function getAutenticacao (email, senha) {
  const usuarioAutenticado = await autenticacaoService.getAutenticaUsuario(email, senha);
  if (!usuarioAutenticado) {
    res.status(403).send('Usuário ou senha inválidos!')
  }
  return usuarioAutenticado
}

// function getRole(){

// }

function authorize (...allowed) {
  // const isAllowed = usuarioAutenticado => allowed.indexOf(usuarioAutenticado) > -1;

  return async (req, res, next) => {
    if (req.auth.user) {
      if(req.auth.user == 'admin' && req.auth.password == 'desafio-igti-nodejs') {
        next();
        return true;
      }
      const usuarioAutenticado = await getAutenticacao(req.auth.user, req.auth.password);
      if (usuarioAutenticado) {
        next();
        return true;
      } else {
        res.status(401).send('Acesso negado!');
      }
    } else {
      res.status(403).send('Usuário não encontrado!');
    }
  }
}

app.use(basicAuth({
  authorizer: async (username, password) => {
    const userMatches = basicAuth.safeCompare(username, 'admin');
    const pwdMatches = basicAuth.safeCompare(password, 'desafio-igti-nodejs');
    if (userMatches && pwdMatches) {
      return true;
    }
    const usuarioAutenticado = await autenticacaoService.getAutenticaUsuario(username, password)
    if (usuarioAutenticado) {
      return true;
    }
    return false;
  }
}))

app.use('/cliente', authorize('admin'), clientesRouter)
app.use('/autor', autoresRouter)
app.use('/livro', livrosRouter)
app.use('/venda', vendasRouter)
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
  res.status(400).send({ error: err.message })
})

export { app }
