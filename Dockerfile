FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run db:generate

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]
