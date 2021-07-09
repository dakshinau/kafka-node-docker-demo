import { KafkaClient as Client, Producer } from 'kafka-node';

const kafkaHost = process.env.KAFKA_HOST || 'localhost:29092';
const client = new Client({ kafkaHost });


const producer = new Producer(client);

// const payloads = [
//   { topic: 'topic1', messages: 'hi26wxxx11' }
// ];

producer.on('ready', function () {
  console.log("Kafka Producer Ready");
  // producer.send(payloads, function (err, data) {
  //     console.log("message send req", err, data);
  // });
});

producer.on('error', function (err) {
  console.log("producer error - ", err);
});

export function send(topic: string, messages: string, key?: string): void {
  producer.send([{topic, messages }], function (err, data) {
      console.log("message send - ", err, data);
  });
}