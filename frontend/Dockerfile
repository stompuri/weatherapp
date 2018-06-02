# base image
FROM node:10.2.1

# create & change to work directory
RUN mkdir -p /usr/src/weather_frontend
WORKDIR /usr/src/weather_frontend

# copy package.json & install dependencies
COPY package.json /usr/src/weather_frontend/package.json
RUN /usr/local/bin/npm install

# copy rest of the files
COPY . /usr/src/weather_frontend

# run frontend
CMD /usr/local/bin/npm start
