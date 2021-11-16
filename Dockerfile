FROM node:16.13.0-alpine
WORKDIR /app
ENV PATH /node_modules.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts -g
COPY . ./
CMD ["npm","start"]