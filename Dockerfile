FROM node:18.20.4-alpine as node

WORKDIR /app

COPY package.json /app

RUN npm install --silent

COPY . .

RUN npm run build

#stage 2
FROM nginx:alpine

COPY --from=node /app/dist/budget /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/templates/default.conf.template
