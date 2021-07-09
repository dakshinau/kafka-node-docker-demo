import { KafkaClient as Client, Consumer } from 'kafka-node';

const kafkaHost = process.env.KAFKA_HOST || 'localhost:29092';
const client = new Client({ kafkaHost });
const consumer = new Consumer(
  client,
  [
      { topic: 'shipments', partition: 0 }
  ],
  {
      autoCommit: false
  }
);

export function onMessage(cb): void {
  consumer.on('message', function (message) {
      console.log("Consumer 1 - Recieve Message", message.value);
      cb(message);
  });
}