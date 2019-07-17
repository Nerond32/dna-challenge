const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

const startMongo = async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, { useNewUrlParser: true }, err => {
    if (err) throw err;
  });
};

const stopMongo = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

module.exports = { startMongo, stopMongo };
