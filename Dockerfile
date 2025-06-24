FROM node:20-alpine AS base
WORKDIR /app


FROM base AS development

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN addgroup -S app && adduser -S app -G app
USER app

CMD ["yarn", "start:dev"]

FROM base AS builder
COPY --from=development /app /app
RUN yarn build

RUN yarn workspaces focus --production

FROM node:20-alpine AS production
WORKDIR /app


COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

USER node

CMD ["node", "dist/main.js"]
