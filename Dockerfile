FROM node:19-alpine3.16 as builder

WORKDIR /app
COPY . .
RUN npm install typescript -g && npm i && tsc --build

CMD ["npm", "run", "start"]