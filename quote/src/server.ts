import app from "./app";
import { Kafka } from "kafkajs";
import { UserRepo } from "./repository/user.repository";
import * as dotenv from "dotenv";
dotenv.config();
const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS!],
});
const consumer = kafka.consumer({ groupId: "test-group" });

const port = 4005;
const start = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "userTopic", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value?.toString()) {
        new UserRepo().save(JSON.parse(message.value?.toString()));
      }
    },
  });

  app.listen(port, () =>
    console.log(
      ` Server running on port ${port} and env == ${process.env.NODE_ENV}`
    )
  );
};
start();
