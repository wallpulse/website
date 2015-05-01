FROM mhart/alpine-iojs:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

RUN rm -rf /tmp/* /root/.npm

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]
