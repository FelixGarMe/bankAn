# Etapa de construcción
FROM node:14 as build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos necesarios para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install
RUN npm install papaparse

# Copia todos los archivos del proyecto
COPY . .

# Construye la aplicación React para producción
RUN npm run build

# Etapa de producción
FROM node:14 as production

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia solo los archivos necesarios para ejecutar la aplicación
COPY --from=build /app/build ./build
COPY package*.json ./

# Instala solo las dependencias de producción
RUN npm install --production

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
