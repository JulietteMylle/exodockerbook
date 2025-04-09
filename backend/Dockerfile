FROM node AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 3001

CMD ["node", "server.js"]