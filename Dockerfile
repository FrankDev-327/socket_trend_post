FROM node:16

# Create app directory
WORKDIR /app

COPY package.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . /app
CMD ["npm", "start"]
EXPOSE 9000

