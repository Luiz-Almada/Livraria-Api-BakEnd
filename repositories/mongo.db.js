import mongoose from "mongoose";

async function connect() {
  const uri = process.env.MONGO_DB_STRING_CONNECTION;
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// import dotenv from "dotenv";
// dotenv.config();

// Credentials
// const dbUser = process.env.DB_USER;
// const dbPass = process.env.DB_PASS;
// const dbCollection = process.env.DB_COLLECTION;

// async function connect() {
//  const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.ehydkxv.mongodb.net/${dbCollection}?retryWrites=true&w=majority`
//  return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// }
// export { connect }

}

export { connect };
