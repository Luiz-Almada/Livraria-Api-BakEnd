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

// async function getRole(username) {
//   if (username == 'admin') {
//     return 'admin';
//   }
//   const usuarioAutorizado = await autenticacaoService.getAutorizacao(username);
//   if (usuarioAutorizado == null) {
//     //res.status(403).send('Usuário não encontrado!')
//     //throw new Error({ message: 'Usuário não encontrado!'})
//     return null;
//   } 
//   else {
//     return 'user'
//   }
// }

// async function authorize(...allowed) {

//   const isAllowed = role => allowed.indexOf(role) > -1;

//   return async (req, res, next) => {
//       if (req.auth.user) {
//           const role = await getRole(req.auth.user);
//           if (role == null) {
//             res.status(403).send('Usuário não encontrado!');
//           }
//           else if (isAllowed(role)) {
//             next();
//           } 
//           else
//           {
//               res.status(401).send('Acesso negado ao Perfil!');
//           }  
//       } else {
//         res.status(403).send('Usuário não encontrado!');
//       }
//   }
// };


app.use(basicAuth({
    authorizer: (username, password) => {
      // let userMatches = false;
      // let pwdMatches = false;
      // let user2Matches = false;
      // let pwd2Matches = false;
      // let usuarioAutenticado;

      // if (username == 'admin' && password == 'desafio-igti-nodejs') {
      //   userMatches = basicAuth.safeCompare(username, 'admin');
      //   pwdMatches = basicAuth.safeCompare(password, 'desafio-igti-nodejs');
      // }

      // user2Matches = basicAuth.safeCompare(username, 'aadaaddsads');
      // pwd2Matches = basicAuth.safeCompare(password, '13141421424124');

   
      
      // user2Matches = basicAuth.safeCompare(username, 'franvieira0@gmail.com');
      // pwd2Matches = basicAuth.safeCompare(password, 'kW1bnjci7');


      //const usuario = autenticacaoService.autentica(username, password).then('usuarioAutenticado');

      // function myDisplayer(some) {
      //   document.getElementById("demo").innerHTML = some;
      // }
      
      // let myPromise = new Promise(function(myResolve, myReject) {
      //   let x = 0;
      //   if (x == 0) {
      //     myResolve("OK");
      //   } else {
      //     myReject("Error");
      //   }
      // });
      
      // myPromise.then(
      //   function(value) {true},
      //   function(error) {false}
      // );

      //usuarioAutenticado = await autenticacaoService.autentica(username, password);

      // if (usuarioAutenticado !== null) {
      // //  user2Matches = basicAuth.safeCompare(username, usuarioAutenticado.email);
      // //  pwd2Matches = basicAuth.safeCompare(password, usuarioAutenticado.senha);
      // }


      //return true; //userMatches && pwdMatches || user2Matches && pwd2Matches;
      const teste = autorizar(username, password)
      return teste;
    }
  })
)

async function autorizar(username, password) {
  return await autenticacaoService.autentica(username, password);
}

app.use('/cliente', clientesRouter)
app.use('/autor', autoresRouter)
app.use('/livro', livrosRouter)
app.use('/venda', vendasRouter)
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
  res.status(400).send({ error: err.message })
})

export { app }
