# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar proyecto
COPY . .

# Build de Nuxt
RUN npm run build


# ---------- Production Stage ----------
FROM node:22-alpine

WORKDIR /app

# Variables de producción
ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV HOST=0.0.0.0

# Copiar output compilado
COPY --from=builder /app/.output ./.output

# Exponer puerto
EXPOSE 3000

# Ejecutar Nitro server
CMD ["node", ".output/server/index.mjs"]