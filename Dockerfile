FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
    neofetch \
    wget \
    curl \ 
    git \ 
    python3 \
    libcurl4 \
    libssl-dev \
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

RUN apt-get -y update && \
    apt-get -y install \
    make \
    cmake \
    automake \
    autoconf \
    m4 \
    build-essential && \
    git clone https://github.com/MatrixTM/ddos.git && \
    cd ddos && \
    pip3 install -r requirements.txt

RUN neofetch

EXPOSE 5000

CMD ["npm", "start"]
