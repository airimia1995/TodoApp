FROM node:14

WORKDIR /app

# install our dependencies and nodejs
RUN apt clean && apt update && apt upgrade -y

# use changes to package.json to force Docker not to use the cache
COPY package.json ./
RUN yarn
COPY . .

CMD [ "yarn", "start" ]