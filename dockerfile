# pull the base image
FROM node:lts-alpine
LABEL maintainer="Jeremy Reed <jreed129@gmail.com>"

# set the working direction
WORKDIR /app

COPY start.sh ./start.sh

COPY /client/package.json ./client/package.json
COPY /client/yarn.lock ./client/yarn.lock

COPY /server/package.json ./server/package.json
COPY /server/yarn.lock ./server/yarn.lock

# install and build client
WORKDIR /app/client
RUN yarn install
COPY /client ./
RUN yarn build

# install and build server
WORKDIR /app/server
RUN yarn install
COPY /server ./
RUN yarn build

WORKDIR /app

RUN yarn config set network-timeout 300000
RUN yarn global add concurrently serve

EXPOSE 3000
EXPOSE 3001

ENTRYPOINT ["/bin/sh"]
CMD ["/app/start.sh"]