# stage 1: PREPARE ENV
FROM whthduck/node-ts:16-alpine AS dependencies 

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn --non-interactive --silent && node-prune

# stage 2: BUILD FROM SOURCE
FROM dependencies AS builder 

COPY . .

RUN yarn build 

# # stage 3: COPY FROM PREVIOUS STAGES 
# COPY FROM PREVIOUS STAGES  
FROM node:16-alpine

RUN apk add curl 

WORKDIR /usr/src/app

COPY package.json ./

COPY vite.config.ts ./

COPY --from=dependencies /usr/src/app/node_modules node_modules

COPY --from=builder /usr/src/app/dist dist

# ARG GIT_COMMIT

# ARG GIT_BRANCH

# RUN echo $BUILD_TAG $(date "+%F %T%z") "("$(echo $GIT_COMMIT | cut -c1-7) $GIT_BRANCH")" > "./version.txt"

USER 1

CMD ["yarn", "start"]