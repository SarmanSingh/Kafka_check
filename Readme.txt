Setup Zookeeper and Kafka on Windows Machine

1. Download kafka binary

2. Check the installation Process by creating a topic my-topic

zookeeper-server-start.bat ..\..\config\zookeeper.properties

kafka-server-start.bat ..\..\config\server.properties

kafka-topics.bat --create --topic my-topic --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3

kafka-console-producer.bat --broker-list localhost:9092 --topic my-topic

kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic my-topic --from-beginning


Create Topics:
Create two topics named "user-events" and "email-notifications" using the Kafka command-line tools.
kafka-topics.bat --create --topic user-events --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1
kafka-topics.bat --create --topic email-notifications --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1



User Service:
Create a new directory for the User Service and navigate into it.
Initialize a new Node.js project using npm init.
Install required dependencies: npm install kafka-node express
Implement User Service

Email Service:
Create a new directory for the Email Service and navigate into it.
Initialize a new Node.js project using npm init.
Install required dependencies: npm install kafka-node.
Implement Email Service

Test the Microservices:
Start the User Service: Run node user-service.js from the User Service directory.
Start the Email Service: Run node email-service.js from the Email Service directory.
Use a tool like Postman to send a POST request to http://localhost:3000/users with a JSON payload representing a user.
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 30,
  "country": "USA"
}

Observe the console output of the Email Service, which should log the email sending process.



