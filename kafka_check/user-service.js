const express = require('express');
const kafka = require('kafka-node');

// Create Kafka client
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

// Create Kafka producer
const producer = new kafka.Producer(kafkaClient);

// Create Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route for creating a user
app.post('/users', (req, res) => {
  const newUser = req.body;

  // Produce 'user-created' event to Kafka
  const payloads = [
    { topic: 'user-events', messages: JSON.stringify({ type: 'user-created', payload: newUser }) },
  ];

  producer.send(payloads, (error, data) => {
    if (error) {
      console.error('Failed to produce event:', error);
      res.status(500).json({ error: 'Failed to create user' });
    } else {
      console.log('User created event sent:', data);
      res.status(201).json(newUser);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`User Service is running on port ${port}`);
});
