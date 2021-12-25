# Сборка образа docker
docker build -t lego/ui .
# Запуск контейнера
docker run -itd -p 3000:80 --network=lego-net --name=lego-ui lego/ui