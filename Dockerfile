FROM node:14 AS build

# install "tsc" globally
RUN npm install typescript -g

# only restore packages at this phase
WORKDIR /app
COPY package.json .
RUN npm install

# copy everything and build it
COPY . .
RUN tsc --build

FROM node:14-alpine AS run

WORKDIR /app
COPY --from=build /app .

CMD ["node", "./dist/index.js"]