FROM node:14
WORKDIR /usr/src/app

COPY . .
EXPOSE 4000

COPY package.json ./
RUN yarn install

CMD [ "yarn", "run", "start" ]
