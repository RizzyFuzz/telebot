FROM node:16.13.0

RUN add-apt-repository universe RUN apt-get update && apt-get install -y \ apache2 \ curl \ git \ libapache2-mod-php5 \ php5 \ php5-mcrypt \ php5-mysql \ python3.4 \ python3-pip
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
