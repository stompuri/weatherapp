# base image
#FROM smebberson/alpine-nginx-nodejs
FROM node:10.2.1

# 1. create & change to work directory
RUN mkdir -p /usr/app/weather_frontend
WORKDIR /usr/app/weather_frontend

# 2. copy package.json & install dependencies
ADD package.json ./package.json
RUN npm install

# 3. copy rest of the files (after npm install to speed up things with caching)
ADD . ./

# 4. run webpack-dev-server
CMD /usr/local/bin/npm run start-dev

# (4.) build frontend
#CMD /usr/local/bin/npm start

# (5.) copy files to nginx
#ADD dist/. /usr/share/nginx/html
