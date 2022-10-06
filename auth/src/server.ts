import app from "./app";
import { Kafka } from "kafkajs";
import * as dotenv from "dotenv";
dotenv.config();
const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS!],
});
const port = 4000;
const start = async () => {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: "userTopic",
      },
    ],
  });
  console.log("created topics");
  await admin.disconnect();
  app.listen(port, () =>
    console.log(
      ` Server running on port ${port} and env == ${process.env.NODE_ENV}`
    )
  );
};
start();
