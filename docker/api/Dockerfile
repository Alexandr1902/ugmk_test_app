FROM node:16

WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY . .

CMD ["npm", "run", "serve"]