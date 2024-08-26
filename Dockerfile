# Base image
FROM node:18

# Set working directory
WORKDIR /app 

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
