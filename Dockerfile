FROM node:latest

WORKDIR /

RUN apt-get update && \
  apt-get install -y \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install && npm install pm2 -g

COPY ./ ./

EXPOSE 5000

ENV PM2_PUBLIC_KEY YOUR_KEY
ENV PM2_SECRET_KEY YOUR_KEY

CMD ['pm2-runtime', index.js]