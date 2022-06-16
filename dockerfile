# pull the base image
FROM node:lts-alpine as builder

# set the working direction
WORKDIR /app

COPY start.sh ./app/start.sh

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

FROM nginx
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/client/build ./app/client/build
COPY --from=builder /app/server ./app/server
COPY --from=builder /app/start.sh ./app/start.sh

RUN yarn global add concurrently serve

EXPOSE 80
EXPOSE 3000
EXPOSE 3001

ENTRYPOINT ["/bin/sh"]
CMD ["/app/start.sh"]