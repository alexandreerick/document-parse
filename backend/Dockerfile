FROM node:alpine

WORKDIR /backend

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]