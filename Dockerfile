# Use Node LTS version
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy app files
COPY package*.json ./
RUN npm install
COPY . .

# Expose port and start app
EXPOSE 8080
CMD ["npm", "start"]
