https://github.com/piotrpersona/nats-streaming-ui
https://github.com/KualiCo/nats-streaming-console

docker run -p 8282:8282 \
-e STAN_URL=http://localhost:4222 \
-e STAN_MONITOR_URL=http://localhost:8222 \
-e STAN_CLUSTER=test-cluster \
piotrpersona/nats-streaming-ui:latest

http://127.0.0.1:8282


ssh-keygen -t rsa -b 4096 -C "dennis.nedry.from.jurassic.park@gmail.com"