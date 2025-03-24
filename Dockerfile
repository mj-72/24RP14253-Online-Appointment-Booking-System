FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Create volume for persistent data
VOLUME ["/app/data"]

# Expose port
EXPOSE 3000

# Set NODE_ENV
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]