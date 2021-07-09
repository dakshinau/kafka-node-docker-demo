# Kafka Node Docker demo
This demo project shows how you can use 2 node applications as a Kafka Producer and a Consumer in a dev environment.
You are still able to make changes to the files and see the changes realtime as the source folders are mounted as volumes

## Project has 3 components
- React UI
- Node app as a producer
- Node app as a consumer

communication with the UI are done through rest APIs and socket.io

# How to run
Just run
`docker-compose up`

*make sure that the following ports are free on your system to run the app properly*
- 3000 - for react UI
- 9000 - for node kafka producer
- 9001 - for node kafka consumer 1
- 9002 - for node kafka consumer 2
