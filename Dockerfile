FROM node:lts-alpine

WORKDIR /app
EXPOSE 3000

COPY ["package*.json", "jsconfig.json", "./"]
COPY src/ ./src/
COPY public/ ./public/

RUN npm i --quiet
RUN npm run build

CMD npm run start:prod
