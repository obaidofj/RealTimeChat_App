# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose a port for the application to listen on
EXPOSE 5000

# Define the command to start the application
CMD ["node", "./dist/app.js"]

# HEALTHCHECK --interval=10s --timeout=3s \
#   CMD curl -f http://127.0.0.1/ || exit 1
# # When running the container, execute the following command
# CMD ["/usr/local/bin/node", "./dist/app.js"]