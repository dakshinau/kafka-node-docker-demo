FROM node:alpine
WORKDIR /var/www/
COPY ["./.eslintrc.json", ".prettierrc", "jest.config.js", "package.json", "tsconfig.json", "tsconfig.release.json", "./"]
RUN yarn
CMD [ "yarn", "dev" ]
EXPOSE 9001