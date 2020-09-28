FROM node:lts-alpine

WORKDIR /app
EXPOSE 3000

COPY ["package*.json", "nwb.config.js", "./"]
COPY src/ ./src/
COPY public/ ./public/

RUN npm i --quiet
RUN npm run build

CMD npx serve -s 3000 .
