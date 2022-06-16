# pull the base image
FROM node:lts-alpine

# set the working direction
WORKDIR /app

COPY start.sh ./app/start.sh
COPY . ./

# install and build
WORKDIR /app/client
RUN yarn install
RUN yarn build

WORKDIR /app/server
RUN yarn install
RUN yarn build

EXPOSE 3000
EXPOSE 3001

WORKDIR /app
FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["/bin/sh"]
CMD ["/app/start.sh"]