import Sequelize from 'sequelize'

const sequelize = new Sequelize(process.env.ELEPHANT_SQL_STRING_CONNECTION, {
  dialect: 'postgres',
  // host: 'localhost',
  // port: 49153,
  // database: 'consulta_credito',
  // username: 'postgres',
  // password: 'mysecretpassword',
  // storage: "./src/database.sqlite",
  logging: false,
  define: {
    timestamps: false
  }
})

export default sequelize
