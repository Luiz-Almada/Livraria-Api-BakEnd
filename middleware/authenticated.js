import basicAuth from "express-basic-auth";
import base64 from "base-64";
import autenticacaoService from "../services/autenticacao.service.js";

export const realizadaAutenticacao = () => {
  return async (req, res, next) => {
    try {
      const authHeaders = req.headers;
      const upd = authHeaders.authorization;
      const pair = base64.decode(upd.substring(6));
      const userName = pair.split(":")[0];
      const password = pair.split(":")[1];

      if (userName == "admin" && password == "desafio-igti-nodejs") {
        global.usuarioId = -1;
        return next();
      }
      const usuario = await autenticacaoService.getAutenticacao(userName);
      if (!usuario) {
        return res.status(401).json({ error: "Usuário não existe!" });
      }
      const passwordMatch = basicAuth.safeCompare(password, usuario.senha);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Senha incorreta!" });
      }

      global.usuarioId = usuario.clienteId;

      return next();
    } catch (err) {
      return res
        .status(401)
        .json({ error: "Nenhum usuário autenticado!" })
        .end();
    }
  };
};
