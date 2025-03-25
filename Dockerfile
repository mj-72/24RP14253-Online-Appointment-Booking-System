# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Set npm config and install dependencies
RUN npm config set unsafe-perm true && \
    npm ci --only=production

COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Set NODE_ENV
ENV NODE_ENV=production

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Create volume for persistent data
VOLUME ["/app/data"]

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]