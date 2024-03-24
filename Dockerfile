# Use official Node.js image as base
FROM node:20

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# build the application
RUN npm run build

# Copy application files
COPY . .

# Expose port 3000 (replace with your application's port if necessary)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/app.ts"]
