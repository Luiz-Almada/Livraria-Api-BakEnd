import autenticacaoService from '../services/autenticacao.service.js'

async function getRole(username) {
  if (username == 'admin') {
    return 'admin';
  }
  const usuarioAutorizado = await autenticacaoService.getAutorizacao(username);
  if (usuarioAutorizado == null) {
    //res.status(403).send('Usuário não encontrado!')
    //throw new Error({ message: 'Usuário não encontrado!'})
    return null;
  } 
  else {
    return 'user'
  }
}

async function authorize(...allowed) {

  const isAllowed = role => allowed.indexOf(role) > -1;

  return async (req, res, next) => {
      if (req.auth.user) {
          const role = await getRole(req.auth.user);
          if (role == null) {
            res.status(403).send('Usuário não encontrado!');
          }
          else if (isAllowed(role)) {
            next();
          } 
          else
          {
              res.status(401).send('Acesso negado ao Perfil!');
          }  
      } else {
        res.status(403).send('Usuário não encontrado!');
      }
  }
};

export default {
  authorize
}