# ---- Stage 1: Build React app ----
# Câu 51: Base Image dùng để build
FROM node:20-alpine AS build

# Câu 52: Thư mục làm việc bên trong container
WORKDIR /app

# Câu 53: Copy package.json và package-lock.json trước
COPY package*.json ./

# Câu 54: Cài đặt package
RUN npm install

# Câu 55: Copy toàn bộ source code React vào container
COPY . .

# Câu 56: Build ra bản production (Vite build ra thư mục "dist")
RUN npm run build

# ---- Stage 2: Serve bằng Nginx ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]