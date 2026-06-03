# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Production Stage
FROM node:22-alpine

LABEL maintainer="Amit Sharma"
LABEL service="auth-service"
LABEL project="production-devops-platform"

WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV=production

RUN npm prune --production

RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["node", "app.js"]
