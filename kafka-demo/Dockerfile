FROM node:alpine
WORKDIR /var/www/
COPY ["package.json", "tsconfig.json", "public", "./"]
RUN npm install -g create-react-app
RUN yarn
CMD [ "yarn", "start" ]
EXPOSE 3000