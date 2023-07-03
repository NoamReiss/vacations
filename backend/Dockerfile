#Inheirt current image from alpine
FROM node:18-alpine

#create an empty directory
WORKDIR /backend

#copy local package*.json into /app:
COPY package*.json /backend

#install npm dependencies:
RUN npm i

#copy project loca files into /app:
COPY . /backend/

#execute npm start
ENTRYPOINT npm start
