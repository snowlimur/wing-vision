FROM node:18-alpine as build

ENV NODE_ENV=production

RUN npm install -g @angular/cli

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN ng build --configuration production

FROM nginx:1.23.4-alpine

COPY --from=build /app/dist /usr/share/nginx/html