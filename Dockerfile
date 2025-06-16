FROM node:22-alpine

WORKDIR /usr/src/app

ARG PORT
ARG MONGODB_URI
ARG JWT_SECRET
ARG SALT
ARG OPENAI_APIKEY
ARG VITE_PEXELS_APIKEY
ARG VITE_API_URL

ENV PORT=${PORT}
ENV MONGODB_URI=${MONGODB_URI}
ENV JWT_SECRET=${JWT_SECRET}
ENV SALT=${SALT}
ENV OPENAI_APIKEY=${OPENAI_APIKEY}
ENV VITE_PEXELS_APIKEY=${VITE_PEXELS_APIKEY}
ENV VITE_API_URL=${VITE_API_URL}

RUN mkdir -p backend frontend backend/assets

COPY /backend/package*.json /usr/src/app/backend
COPY /frontend/package*.json /usr/src/app/frontend

RUN cd backend && npm install
RUN cd frontend && npm install

COPY backend /usr/src/app/backend
COPY frontend /usr/src/app/frontend

RUN cd backend && npm run build
RUN cd frontend && npm run build

RUN mv frontend/dist/* backend/assets

RUN rm -rf frontend

WORKDIR /usr/src/app/backend

CMD ["npm", "start"]