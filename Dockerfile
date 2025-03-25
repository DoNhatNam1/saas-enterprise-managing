FROM node:18.8-alpine as base

# Build stage
FROM base as builder

WORKDIR /home/node/app

# Copy dependency files
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build-time variables (NEXT_PUBLIC_*)
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_UPLOADTHING_URL
ARG NEXT_PUBLIC_KINDE_SITE_URL

# Build application
RUN yarn build

# Production stage
FROM base as runtime

ENV NODE_ENV=production

WORKDIR /home/node/app

# Copy dependency files
COPY package*.json yarn.lock ./

# Install production dependencies
RUN yarn install --production --frozen-lockfile

# Copy built application from builder stage
COPY --from=builder /home/node/app/dist ./dist

# Runtime environment variables
ENV DATABASE_URI=
ENV PAYLOAD_SECRET=
ENV UPLOADTHING_SECRET=
ENV UPLOADTHING_APP_ID=
ENV APPID=
ENV KEY1=
ENV KEY2=
ENV RESEND_SENDER_EMAIL=
ENV RESEND_API_KEY=
ENV KINDE_CLIENT_ID=
ENV KINDE_CLIENT_SECRET=
ENV KINDE_ISSUER_URL=

EXPOSE 3000

CMD ["node", "dist/server.js"]