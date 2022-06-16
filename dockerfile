# pull the base image
FROM nginx:alpine
LABEL maintainer="Jeremy Reed <jreed129@gmail.com>"

# Install nvm with node and npm
RUN apk add --no-cache --repository http://nl.alpinelinux.org/alpine/edge/main libuv \
    && apk add --no-cache --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/main nodejs \
    && apk add --no-cache --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/community npm yarn \
    && echo "NodeJS Version:" "$(node -v)" \
    && echo "NPM Version:" "$(npm -v)" \
    && echo "Yarn Version:" "$(yarn -v)"

RUN yarn global add concurrently serve

# set the working direction
WORKDIR /app

COPY start.sh ./app/start.sh
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

COPY /client/package.json ./client/package.json
COPY /client/yarn.lock ./client/yarn.lock

# install and build client
WORKDIR /app/client
RUN yarn install
COPY /client ./
RUN yarn build

COPY /server/package.json ./server/package.json
COPY /server/yarn.lock ./server/yarn.lock

# install and build server
WORKDIR /app/server
RUN yarn install
COPY /server ./
RUN yarn build

# FROM nginx
# RUN apt-get update -qq
# RUN apt-get install -y curl
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt install -y nodejs npm yarn

# COPY start.sh ./app/start.sh
# COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/client/build ./app/client/build
# COPY --from=builder /app/server ./app/server

WORKDIR /app

EXPOSE 80
EXPOSE 3000
EXPOSE 3001


CMD ["concurrently", "\"serve -s client/build\"", "\"node server/index.js\"", "\"nginx -g daemonoff\""]
# ENTRYPOINT ["/bin/sh"]
# CMD ["/app/start.sh"]