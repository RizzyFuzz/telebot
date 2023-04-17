FROM node:16.13.0

RUN apt-get update && apt upgrade -y && \
  apt-get install -y \
  ffmpeg && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .
RUN npm install -g npm@latest
RUN npm install 

COPY . .
EXPOSE 5000

CMD ["node", "."]