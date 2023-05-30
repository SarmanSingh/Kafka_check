const kafka = require('kafka-node');

// Create Kafka client
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

// Create Kafka consumer
const consumer = new kafka.Consumer(kafkaClient, [{ topic: 'user-events', groupId: 'email-service' }]);

// Consume events from Kafka
consumer.on('message', (message) => {
  const event = JSON.parse(message.value);

  // Handle 'user-created' event
  if (event.type === 'user-created') {
    const newUser = event.payload;
    console.log(`Sending welcome email to user: ${newUser.email}`);
    // Implement logic to send the welcome email to the new user
  }
});

// Start the consumer
consumer.on('error', (error) => {
  console.error('Error in consumer:', error);
});

console.log('Email Service is running...');
