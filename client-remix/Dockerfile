FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install

npm run build

COPY . .

CMD ["npm", "run", "start"]