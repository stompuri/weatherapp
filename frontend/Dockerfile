# base image
FROM smebberson/alpine-nginx-nodejs

# create & change to work directory
RUN mkdir -p /usr/app/weather_frontend
WORKDIR /usr/app/weather_frontend

# copy package.json & install dependencies
COPY package.json /usr/app/weather_frontend/package.json
RUN npm install

# copy rest of the files
COPY . /usr/app/weather_frontend

# build frontend
CMD /usr/local/bin/npm start

# copy files to nginx
ADD dist/. /usr/share/nginx/html
