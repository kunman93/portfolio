#
# STAGE: Base
#
FROM node:20-alpine AS base
## Create and set working directory
WORKDIR /app
## Copy package.json and install dependencies
COPY package.json .
RUN npm install
## Copy the application source code
COPY . .

#
# STAGE: Build
#
FROM base AS build
## Build the Angular application
RUN npm run build --prod

#
# STAGE: Prod
#
FROM nginx:1.27-alpine AS prod
## Nginx setup
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build app/dist/portfolio/browser /usr/share/nginx/html
EXPOSE 80
