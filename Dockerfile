# Stage 1: Build
FROM node:20.19.6-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./.env /usr/share/nginx/html
# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
