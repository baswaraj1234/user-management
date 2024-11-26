# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if present) into the working directory
COPY package*.json ./

# Install the dependencies listed in package.json
RUN npm install

# Copy all files from the current directory to the container's working directory
COPY . .

# Build the application (typically transpiling code or bundling assets)
RUN npm run build

# Expose port 3000 on the container to be accessible from the host
EXPOSE 3000

# Define the command to run the app when the container starts
CMD ["npm", "start"]
