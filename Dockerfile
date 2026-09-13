FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm ci

COPY . .

ENV DATABASE_URL="file:/app/dev.db"

RUN npx prisma generate

RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["npm", "run", "dev"]