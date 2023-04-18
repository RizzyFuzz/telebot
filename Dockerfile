FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y \
    neofetch \
    wget \
    curl \ 
    git \ 
    python3.8 \
    python3-pip \
    ffmpeg \
    speedtest-cli

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

COPY package.json .
RUN npm install -g npm@latest 
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
