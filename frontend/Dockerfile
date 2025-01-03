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
# STAGE: Test
#
FROM base AS test
## Install Chromium for the unit / e2e tests
RUN apk add --no-cache chromium
### Set environment variables
ENV CHROME_BIN=/usr/bin/chromium-browser
## Run unit tests
RUN npm run test-ci

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
