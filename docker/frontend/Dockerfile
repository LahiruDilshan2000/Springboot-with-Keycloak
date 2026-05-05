#FROM node:20 AS build-stage
#
#
#WORKDIR /app
#
##COPY package*.json ./
#COPY book-shop-fe/package*.json ./
#
#RUN npm install
#
#COPY . .
#
#RUN npm run build --prod
#
#FROM nginx:alpine
#
##COPY nginx.conf /etc/nginx/nginx.conf
#COPY book-shop-fe/nginx.conf /etc/nginx/nginx.conf
#
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#
#EXPOSE 80
#
#

FROM node:20 AS build-stage

WORKDIR /app

# ✅ FIX: point to correct folder
COPY book-shop-fe/package*.json ./

RUN npm install

# ✅ FIX: copy entire frontend source
COPY book-shop-fe/ .

RUN npm run build

FROM nginx:alpine

COPY book-shop-fe/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
