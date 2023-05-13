import LivroService from "../services/livro.service.js";
async function createLivro(req, res, next) {
  let livro = req.body;

  try {
    if (!livro.nome || !livro.valor || !livro.estoque || !livro.autorId) {
      throw new Error("Nome, Valor, Estoque e Autor ID são obrigatórios.")
    }
    livro = await LivroService.createLivro(livro);
    res.send(livro);
    logger.info(`POST /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function getLivros(req, res, next) {
  try {
    res.send(await LivroService.getLivros(req.query.autorId));
    logger.info("GET /livro");
  } catch (err) {
    next(err);
  }
}

async function getLivro(req, res, next) {
    try {
    res.send(await LivroService.getLivro(req.params.id));
    logger.info("GET /livro");
  } catch (err) {
    next(err);
  }
}

async function deleteLivro(req, res, next) {
  try {
    await LivroService.deleteLivro(req.params.id);
    res.end();
    logger.info("DELETE /livro");
  } catch (err) {
    next(err);
  }
}

async function updateLivro(req, res, next) {
  let livro = req.body;

  try {
    if (!livro.livroId || !livro.valor || !livro.estoque) {
      throw new Error("Livro Id, Valor e Estoque são obrigatórios.")
    }

    livro = await LivroService.updateLivro(livro);
    res.send(livro);
    logger.info(`PUT /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function createLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;

    if (!livroInfo.livroId) {
      throw new Error("Livro ID é obrigatório");
    }

    livroInfo = await LivroService.createLivroInfo(livroInfo);
    res.send();
    logger.info(`POST /livro/info - ${JSON.stringify(livroInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function updateLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;

    if (!livroInfo.livroId) {
      throw new Error("Livro ID é obrigatório");
    }

    livroInfo = await LivroService.updateLivroInfo(livroInfo);
    res.send();
    logger.info(`PUT /livro/info - ${JSON.stringify(livroInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function createAvaliacao(req, res, next) {
  try {
    let params = req.body;
    if (!params.livroId || !params.avaliacao) {
      throw new Error("Livro ID e Avaliacao são obrigatórios.")
    }
    await LivroService.createAvaliacao(params.avaliacao, params.livroId);
    res.end();
    logger.info(`POST /livro/avaliacao`);
  } catch (err) {
    next(err);
  }
}

async function deleteAvaliacao(req, res, next) {
  try {
    await LivroService.deleteAvaliacao(req.params.id, req.params.index);
    res.end();
    logger.info(`DELETE /livro/${req.params.id}/${req.params.index}`);
  } catch (err) {
    next(err);
  }
}

async function getLivrosInfo(req, res, next) {
    try {
    res.send(await LivroService.getLivrosInfo());
    logger.info("GET /livro/info");
  } catch (err) {
    next(err);
  }
}

async function deleteLivroInfo(req, res, next) {
  try {
  res.send(await LivroService.deleteLivroInfo(parseInt(req.params.id)));
  logger.info("DELETE /livro/info");
  } catch (err) {
    next(err);
  }
}


export default {
  createLivro,
  getLivros,
  getLivro,
  deleteLivro,
  updateLivro,
  createLivroInfo,
  updateLivroInfo,
  createAvaliacao,
  deleteAvaliacao,
  getLivrosInfo,
  deleteLivroInfo
}