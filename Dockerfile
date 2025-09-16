# Use Playwright base image with necessary browsers
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./

# Install Node.js dependencies
RUN npm install

# Copy app source code
COPY . .

# ✅ Explicitly install browsers — IMPORTANT
RUN npx playwright install chromium

# Expose server port
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
