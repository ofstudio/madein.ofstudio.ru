FROM node:6-alpine

ARG INSTALL_PATH
ARG THEME_PATH
ARG CONTENT_PATH

ENV INSTALL_PATH=$INSTALL_PATH
ENV THEME_PATH=$THEME_PATH
ENV CONTENT_PATH=$CONTENT_PATH
ENV NODE_ENV=production

RUN mkdir "$CONTENT_PATH" && chown -R node:node "$CONTENT_PATH"
VOLUME $CONTENT_PATH

WORKDIR $INSTALL_PATH
COPY package.json ./
RUN npm install --production
COPY index.js config.js helpers.js entrypoint ./
COPY content/themes/build $THEME_PATH

EXPOSE 2368
USER node
CMD ./entrypoint
