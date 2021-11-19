FROM node:16.13.0-alpine
WORKDIR /app
ENV PATH /node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
EXPOSE 80
RUN npm install --silent
COPY . ./
CMD ["npm","start"]