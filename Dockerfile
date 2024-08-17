FROM node:latest

WORKDIR /app

COPY ./dist dist
COPY ./server server

RUN cd server && npm install

EXPOSE 3000

CMD node server