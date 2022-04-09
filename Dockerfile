FROM node:14.15.4-alpine

ARG DOCKER_ENV
ENV NODE_APP_ENV=${DOCKER_ENV}
ENV TZ=Asia/Bangkok

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app
COPY . ./

RUN rm -rf .env
COPY .env .env

RUN yarn install && \
    yarn build

EXPOSE 5001
CMD ["npm", "run", "start:prod"]