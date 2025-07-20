# Use smaller Node image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Set PORT
ENV PORT=8080
EXPOSE 8080

# Start app
CMD ["node", "app.js"]
