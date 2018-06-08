# base image
FROM node:10.2.1

# 1. create & change to work directory
RUN mkdir -p /usr/src/weatherapp_backend
WORKDIR /usr/src/weatherapp_backend

# 2. copy package.json & install dependencies
ADD package.json ./package.json
RUN /usr/local/bin/npm install

# 3. copy files (after npm install to speed up things with caching)
ADD . ./

# 4. expose PORT
EXPOSE 9000

# 5. run backend
CMD DEBUG=weathermap /usr/local/bin/node src/index.js
