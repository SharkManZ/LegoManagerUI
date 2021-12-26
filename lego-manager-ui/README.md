# Сборка образа docker
docker build -t lego/ui .
# Запуск контейнера
docker run -itd -p 3000:80 --network=lego-net --mount type=bind,source=H:\Projects\js\LegoManagerUI\lego-manager-ui\public\lego-images,target=/usr/share/nginx/html/lego-images --name=lego-ui lego/ui