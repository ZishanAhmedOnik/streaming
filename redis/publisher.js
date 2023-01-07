const redis = require("redis");
const { HOST, PORT } = require("../config/redis.config");

const publisher = redis.createClient({
  socket: {
    host: HOST,
    port: PORT,
  },
});

publisher
  .connect()
  .then(() => {
    console.log("connected to redis");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = publisher;
