FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
    neofetch \
    wget \
    curl \ 
    git \
    chronium \
    ffmpeg \
    speedtest-cli

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

COPY package.json .
RUN npm install -g npm@latest 
RUN npm install

COPY . .


RUN neofetch

EXPOSE 5000

CMD ["npm", "start"]
