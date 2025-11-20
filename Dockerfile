FROM node:22-alpine AS deps
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile

FROM deps AS builder
WORKDIR /app
COPY . .
RUN yarn build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.env.docker ./.env

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000
CMD ["node", "server.js"]