build: startdb initdb compile start

startdb:
	systemctl start mongod

initdb:
	mongo gogosg scripts/init.mongo.js

compile:
	npx webpack

start:
	nodemone -w server -e js,graphql server/server.js

