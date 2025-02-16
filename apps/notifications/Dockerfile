FROM docker.io/node:lts-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock nx.json tsconfig.base.json ./

RUN yarn install

COPY . .

RUN yarn nx build notifications

FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system notifications && \
    adduser --system -G notifications notifications

COPY --from=builder /app/dist/apps/notifications notifications/

RUN chown -R notifications:notifications /app

WORKDIR /app/notifications
RUN yarn install --production --frozen-lockfile

WORKDIR /app

CMD [ "node", "notifications" ]
