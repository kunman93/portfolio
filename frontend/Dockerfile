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
## Run the lint
RUN npm run lint

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
FROM test AS build
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

#
# STAGE: E2E-Test
#
FROM cypress/browsers:node-20.17.0-chrome-129.0.6668.70-1-ff-130.0.1-edge-129.0.2792.52-1 AS e2e-test
## Create and set working directory
WORKDIR /e2e-tests
## COPY everything from base stage
COPY --from=base app/ /e2e-tests/
## Install dependencies
RUN npm install
## Include service 'frontend' in baseUrl as defined in compose.yaml and run the e2e tests 
ENV CYPRESS_baseUrl=http://frontend
CMD ["npm", "run", "e2e-test-ci"]
