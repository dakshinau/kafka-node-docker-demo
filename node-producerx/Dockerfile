FROM node:alpine
WORKDIR /var/www/
COPY ["./.eslintrc.json", ".prettierrc", "jest.config.js", "package.json", "nodemon.json",  "tsconfig.json", "tsconfig.release.json", "./"]
RUN yarn
CMD [ "yarn", "dev" ]
EXPOSE 9000