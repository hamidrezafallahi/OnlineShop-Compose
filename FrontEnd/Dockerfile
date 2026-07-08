# FROM node:22.19.0-alpine3.22

# RUN addgroup app && adduser -S -G app app

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY --chown=app:app . .

# USER app

# RUN npm run build

# ENV API_URL=https://onlineshop/api

# EXPOSE 3000

# CMD ["npm", "start"]
# =========================================
# Frontend Dockerfile - Next.js 15 (standalone output)
# Place this file at: ./FrontEnd/Dockerfile
# =========================================

# ---------- deps ----------
FROM node:22.19.0-alpine3.22 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ---------- builder ----------
FROM node:22.19.0-alpine3.22 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time public URL that gets baked into the client bundle.
# Must be provided as a build ARG because NEXT_PUBLIC_* vars are inlined at build time.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN yarn build

# ---------- runner ----------
FROM node:22.19.0-alpine3.22 AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup app && adduser -S -G app app

# Only copy what "standalone" output actually needs to run
COPY --from=builder /app/public ./public
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static

USER app

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

# standalone output ships its own minimal server.js - no need for "npm start"
CMD ["node", "server.js"]