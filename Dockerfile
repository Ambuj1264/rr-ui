FROM node:18.16.1

WORKDIR /app/resource_reservation_ui

RUN chown -R node:node /app/resource_reservation_ui

COPY package*.json ./

RUN npm install -f

COPY . .

EXPOSE 3005

CMD ["npm", "run", "start"]
