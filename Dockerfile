# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source
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