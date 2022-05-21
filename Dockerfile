# command
# docker build --rm=true --force-rm=true -t emdko-chan .
# docker run -it -v "$HOME/workspace/test:/workspace/" --rm --name emdko-chan-runnning emdko-chan

FROM ubuntu:18.04
RUN apt-get update

# install library
RUN apt install -y nodejs && \
    apt install -y npm && \
    npm install n -g && \
    n 16.15.0

# install 