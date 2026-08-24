# ---- build stage: compile TypeScript ----
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

# .dockerignore keeps .env, node_modules, dist and wip out of this.
COPY . .

RUN npm run build

# ---- runtime stage: production deps + compiled output ----
# Staying on node:20 rather than node:20-slim so bcrypt's prebuilt native
# binary keeps resolving without pulling in build tools.
FROM node:20

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

# swagger.js reads docs/swaggerDescription.md relative to dist/..
COPY docs ./docs

EXPOSE 3000

CMD ["node","dist/server.js"]
