FROM node:20.18.0-alpine AS node

WORKDIR /app

COPY package*.json ./

RUN chown -R node:node /app

USER node

RUN npm install --silent

COPY --chown=node:node . .

RUN npm run build

FROM nginx:1.27.4

COPY --from=node /app/dist/budget/browser /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/templates/default.conf.template
