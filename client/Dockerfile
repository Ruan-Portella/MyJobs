FROM node:18.12.1-slim

WORKDIR /app/client

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run" ]

RUN npm run build

CMD [ "start" ]
