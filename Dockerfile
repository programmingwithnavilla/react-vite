# Build React app

From node:20-alpine AS build

WORKDIR /app

COPY package*.json  package-lock*.json ./
RUN npm install

COPY . .
RUN npm run build

# Server Using Nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]