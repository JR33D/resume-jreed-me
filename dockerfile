####################################
## First stage to build artifacts ##
####################################
FROM node:lts-alpine as builder
LABEL maintainer="Jeremy Reed <jreed129@gmail.com>"

# set the working direction
WORKDIR /app

COPY /client/package.json ./client/package.json
COPY /client/yarn.lock ./client/yarn.lock

COPY /server/package.json ./server/package.json
COPY /server/yarn.lock ./server/yarn.lock

# install and build client
WORKDIR /app/client
RUN yarn install --production
COPY /client ./
RUN yarn build

# install and build server
WORKDIR /app/server
RUN yarn install --production
COPY /server ./
RUN yarn build

######################################################
## Second stage to copy build artifacts and run app ##
######################################################
FROM node:lts-alpine 
LABEL maintainer="Jeremy Reed <jreed129@gmail.com>"

RUN yarn config set network-timeout 300000
RUN yarn global add concurrently serve

WORKDIR /app

COPY start.sh ./start.sh

COPY /client/package.json ./client/package.json
COPY /client/yarn.lock ./client/yarn.lock

COPY /server/package.json ./server/package.json
COPY /server/yarn.lock ./server/yarn.lock

# install and copy client
WORKDIR /app/client
RUN yarn install --production
COPY --from=builder /app/client/build ./client/

# install and copy server
WORKDIR /app/server
RUN yarn install --production
COPY --from=builder /app/server/build ./server/

EXPOSE 3000
EXPOSE 3001

ENTRYPOINT ["/bin/sh"]
CMD ["/app/start.sh"]