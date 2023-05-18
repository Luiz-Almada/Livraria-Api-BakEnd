import base64 from 'base-64';
import autenticacaoService from '../services/autenticacao.service.js'

export function can() {
  return async (req, res, next) => {
    try {
      const authHeaders = req.headers;
      const upd = authHeaders.authorization;
      const pair = base64.decode(upd.substring(6));
      const userName = pair.split(":")[0];
      const password = pair.split(":")[1];
      
      if (userName == 'admin') {
        return next();
      }

      const usuario = await autenticacaoService.getAutenticacao(userName);
      if (!usuario) {
        return res.status(401).json({ error: "Usuário não existe!" }); 
      }    
      return next();      
    } catch (error) {
      return res.status(403).json({ error: "Usuário não tem permissão!" });       
    }
  };
}

export function is(usuario) {
  return async (req, res, next) => {
    try {
      const authHeaders = req.  headers;
      const upd = authHeaders.authorization;
      const pair = base64.decode(upd.substring(6));
      const userName = pair.split(":")[0];
      const password = pair.split(":")[1];
      if (userName == usuario) {
        return next();
      }
      return res.status(401).json({ error: "Usuário não tem permissão!" }); 
    } catch (error) {
      return res.status(401).json({ error: "Usuário não tem permissão!" });       
    }
  };
}