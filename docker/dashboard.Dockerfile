FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
COPY apps/management-dashboard/package.json apps/management-dashboard/
COPY packages/ packages/
RUN npm install
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
