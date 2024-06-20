# First stage: Build the application
FROM node:18-alpine AS build

WORKDIR /app

# Copy only the package.json and package-lock.json files to the container
COPY package*.json ./

# Install all dependencies, including development dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Build the NestJS application
RUN npm run build

# Second stage: Create a smaller production image
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install production dependencies only
RUN npm install --legacy-peer-deps --omit=dev

# Expose the port that your NestJS application will run on
EXPOSE 5001

# Define the command to start your NestJS application
CMD ["node", "./dist/src/main.js"]