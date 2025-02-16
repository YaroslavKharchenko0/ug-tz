FROM docker.io/node:lts-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock nx.json tsconfig.base.json ./

RUN yarn install

COPY . .

RUN yarn nx build products

FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system products && \
    adduser --system -G products products

COPY --from=builder /app/dist/apps/products products/

RUN chown -R products:products /app

WORKDIR /app/products
RUN yarn install --production --frozen-lockfile

WORKDIR /app

CMD [ "node", "products" ]
