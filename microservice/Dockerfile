FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Set npm config and install dependencies
RUN npm config set unsafe-perm true && \
    npm ci --only=production

COPY . .

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 3001

CMD ["node", "notificationService.js"]