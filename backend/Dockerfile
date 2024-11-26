# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of the application files to the container
COPY . .

# Step 7: Expose the port the app will run on
EXPOSE 5000

# Step 8: Run the application
CMD ["npm", "run", "start"]
