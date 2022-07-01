# FROM is the base image that will be used
FROM node
#Start at this directory or create one with same name
WORKDIR /app
#Copying the json to avoid conflict with node_modules
COPY package.json ./

RUN npm install

COPY . ./
#Final command to start container
CMD npm start