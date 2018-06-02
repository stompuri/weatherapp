# base image
FROM node:10.2.1

# create & change to work directory
RUN mkdir -p /usr/src/weather_backend
WORKDIR /usr/src/weather_backend

# copy package.json & install dependencies
COPY package.json /usr/src/weather_backend/package.json
RUN /usr/local/bin/npm install

# copy js file
COPY src/index.js /usr/src/weather_backend/src/index.js

# expose PORT
EXPOSE 9000

# run backend
CMD /usr/local/bin/node src/index.js
