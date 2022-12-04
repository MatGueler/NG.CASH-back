FROM node:16

WORKDIR /user/src/

COPY . .

RUN npm i --force
RUN npm run build

EXPOSE 5000

CMD [ "npm", "start"]