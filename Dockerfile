FROM node:22.16.0-alpine3.22 AS builder
WORKDIR /app
COPY ./package.json package-lock.json ./
RUN \
--mount=type=cache,target=/root/.npm \
npm ci
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs22 AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
EXPOSE 3000
CMD ["server.js"]