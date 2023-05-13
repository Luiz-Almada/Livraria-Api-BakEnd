import { app } from './index.js';
import db from './repositories/db.js';
import { connect } from './repositories/mongo.db.js';

import mongoose from "mongoose";

mongoose.connection.on('connected', function () {
  console.log('Banco de dados MongoDB Conectado!');
 });


db.sync().then(async () => {
  await console.log("Banco de dados Postgres Conectado!");
});

app.listen(5678, () => {
  console.log(
    "Bootcamp desenvolvedor back end - Desafio Final ouvindo na porta 5678!"
  );
});
