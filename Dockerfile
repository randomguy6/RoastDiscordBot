# Use an official Node.js runtime as a base image
FROM node:18.16.0-alpine3.17

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the rest of the application code
COPY . .

# Install application dependencies
RUN npm install

# Expose the port that your application will run on
EXPOSE 3000

# Command to run your application
CMD ["node", "app.js"]