FROM node:alpine AS build

WORKDIR /app

ARG API_ENDPOINT
ENV API_ENDPOINT=$API_ENDPOINT

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

RUN npm install --production

EXPOSE 3000

CMD ["node", "build/index.js"]