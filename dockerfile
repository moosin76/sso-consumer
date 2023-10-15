FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
COPY config_docker.js config.js
RUN npm run build
EXPOSE 3000
CMD ["node", "./dist/ssr/index.js"]
