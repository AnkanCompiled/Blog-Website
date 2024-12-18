import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});

redisClient.connect();

export default redisClient;
