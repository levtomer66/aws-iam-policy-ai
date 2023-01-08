FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code to the working directory
COPY . .
EXPOSE 3000
# Run the app when the container starts
CMD ["node", "server/index.js"]
