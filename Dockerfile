# Etapa de construcción usando Node.js 23
FROM node:23-alpine AS builder

# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY package.json package-lock.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente
COPY . .

# Copiar el archivo .env
COPY .env .env

# Construir la aplicación de Next.js
RUN npm run build

# Etapa de producción
FROM node:23-alpine

# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar las dependencias de la etapa anterior
COPY --from=builder /app /app

# Exponer el puerto en el que Next.js corre
EXPOSE 3000

# Copiar el archivo .env a la etapa de producción
COPY --from=builder /app/.env /app/.env

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
