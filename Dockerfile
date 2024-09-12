FROM node:20-alpine

RUN apk add --update --no-cache \
  curl \
  git \
  vim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Copy everything else on the project
COPY . .

RUN npm build

EXPOSE 8080

CMD ["node", "dist/main.js"]