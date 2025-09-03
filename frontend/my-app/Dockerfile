FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# به جای build، مستقیم run کن
EXPOSE 3000
CMD ["npm", "start"]
