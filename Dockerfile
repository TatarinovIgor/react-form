# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:19-alpine


RUN apk update && \
    apk add --no-cache curl bash

# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000

#Healthcheck
HEALTHCHECK --interval=30s --start-period=1m --timeout=30s --retries=3 \
    CMD curl --silent --fail --fail-early http://127.0.0.1:3000 || exit 1

# Start the app
CMD [ "npx", "serve", "build" ]
