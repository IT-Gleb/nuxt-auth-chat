FROM node:21.7-alpine

ENV APP_ROOT=/web
WORKDIR ${APP_ROOT}
COPY .output ${APP_ROOT}/.output
EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]