import LimpaTabelasService from '../services/limpa-tabelas.service.js'

async function deletaTabelas (req, res, next) {
  try {
    await LimpaTabelasService.deletaTabelas()
    res.end()
    logger.info('DELETE /tabelas')
  } catch (err) {
    next(err)
  }
}

export default {
  deletaTabelas
}
