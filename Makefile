build-docker:
	@ docker build -f devops/Dockerfile -t web-yavirac:latest .
build-docker-test:
	@ docker build -f devops/Dockerfile -t web-test:latest .
npm-install:
	@ sudo rm -rf $$(pwd)/node_modules
	@ sh -c "docker run -it --rm -w /app -v $$(pwd):/app web-yavirac:latest npm install --save --silent"
	@ sh -c "docker run -it --rm -w /app -v $$(pwd):/app web-yavirac:latest npm install nodemon --save-dev"	
npm-install-test:
	@ sudo rm -rf $$(pwd)/node_modules
	@ sh -c "docker run -it --rm -w /app -v $$(pwd):/app web-test:latest npm install --save --silent"
	@ sh -c "docker run -it --rm -w /app -v $$(pwd):/app web-test:latest npm install nodemon --save-dev"
deploy-local-test:
	@ docker stack deploy -c devops/docker-stack-local.yml web-test
deploy-prod:
	@ docker stack deploy -c devops/docker-stack-prod.yml web-yavirac
deploy-test:
	@ docker stack deploy -c devops/docker-stack-test.yml web-test
rm-test:
	@ docker stack rm web-test
rm:
	@ docker stack rm web-yavirac	
network:
	@ docker network create --driver overlay --scope swarm web_yairac || true
network-test:
	@ docker network create --driver overlay --scope swarm web_net || true
copy-db:
	@ docker cp devops/db/web.tar $$(docker ps -q -f name=web-yavirac_mongo):/
	@ docker exec -it $$(docker ps -q -f name=web-yavirac_mongo) bash -c "tar xvzf /web.tar"	
copy-db-test:
	@ docker cp devops/db/web.tar $$(docker ps -q -f name=web-test_mongo):/
	@ docker exec -it $$(docker ps -q -f name=web-test_mongo) bash -c "tar xvzf /web.tar"	
restore-db:
	@ docker exec -it $$(docker ps -q -f name=web-yavirac_mongo) bash -c "mongorestore --host localhost:27017 -u user_web -p 'KinswomanFloristUpstageTaekwondoEngraverOveractDemeanorStraddleFlop' --authenticationDatabase admin -d web web/"
restore-db-test:
	@ docker exec -it $$(docker ps -q -f name=web-test_mongo) bash -c "mongorestore -d web web/"	
volume:
	@ docker volume create mongo_data_web
volume-test:
	@ docker volume create mongo_data.
#Backup:
#mongodump -u user_web -p top-secret --authenticationDatabase admin  -d web -o /home/backup
