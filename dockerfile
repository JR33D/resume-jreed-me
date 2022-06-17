# pull the base image
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
RUN yarn install
COPY /client ./
RUN yarn build

# install and build server
WORKDIR /app/server
RUN yarn install
COPY /server ./
RUN yarn build

FROM nginx:alpine
LABEL maintainer="Jeremy Reed <jreed129@gmail.com>"

# Install node, npm, and yarn
RUN apk add --no-cache --repository http://nl.alpinelinux.org/alpine/edge/main libuv \
    && apk add --no-cache --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/main nodejs \
    && apk add --no-cache --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/community npm yarn \
    && echo "NodeJS Version:" "$(node -v)" \
    && echo "NPM Version:" "$(npm -v)" \
    && echo "Yarn Version:" "$(yarn -v)"

RUN yarn global add concurrently serve --network-timeout 10000

COPY start.sh ./app/start.sh
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/client/build ./app/client/build
COPY --from=builder /app/server ./app/server


EXPOSE 80
EXPOSE 3000
EXPOSE 3001


# CMD ["concurrently", "\"serve -s /app/client/build\"", "\"node /app/server/index.js\""]
# CMD ["nginx"]
ENTRYPOINT ["/bin/sh"]
CMD ["/app/start.sh"]