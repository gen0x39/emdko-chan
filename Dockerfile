# install Ubuntu18:04
FROM ubuntu:18.04

# set working directory
WORKDIR /workspace

# install library
RUN apt-get update && \
apt install -y curl

# install node.js 16.15.0
RUN apt install -y nodejs && \
apt install -y npm && \
npm install n -g && \
n 16.15.0

# npm install discord.js
COPY ./package.json ./
RUN npm install

# environment variable
ARG apikey
ENV APIKEY=${apikey}