FROM node:18-alpine
WORKDIR var/www
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production #clean all dependencies except production
CMD ["node", "./dist/main.js"]