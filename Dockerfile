FROM node:20-alpine

WORKDIR /app

# Install build tools (minimal for Alpine)
RUN apk add --no-cache python3 make g++ git

# Copy package files for layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build if needed
RUN npm run build --if-present

# Expose port
EXPOSE 3000

# Default command for production
CMD ["npm", "start"]
