FROM node:16

WORKDIR /user/src/

COPY . .

RUN npm i
RUN npm run build

EXPOSE 5007

CMD [ "npm", "start"]