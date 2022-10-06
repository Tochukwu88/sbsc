import { Kafka } from "kafkajs";
import { IUser } from "../interfaces/user.interface";
import * as dotenv from "dotenv";
dotenv.config();
const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS!],
});
export const userCreatedEvent = async (payload: IUser) => {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "userTopic",
    messages: [
      {
        value: JSON.stringify({
          id: payload.id,
          name: payload.name,
          email: payload.email,
        }),
      },
    ],
  });
  await producer.disconnect();
};
