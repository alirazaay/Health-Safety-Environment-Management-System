FROM node:20-alpine

WORKDIR /app
COPY apps/backend/package*.json ./
RUN npm install
COPY apps/backend/ .

EXPOSE 5000
CMD ["npm", "start"]
