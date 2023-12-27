# Base Image : https://hub.docker.com/_/node/tags
FROM node:latest

LABEL org.opencontainers.image.authors="yuzhong1214@gmail.com"

ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Set the default shell
ENV SHELL /bin/bash

# Install common tools
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    sudo \
    curl \
    git \
    git-extras \
    htop \
    net-tools \
    tmux \
    vim \
    wget \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create the user
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

COPY .bashrc /home/$USERNAME/.bashrc

USER $USERNAME
CMD ["/bin/bash"]

RUN git clone https://github.com/YuZhong-Chen/.setup_env.git ~/.setup_env && \
    cd ~/.setup_env && ./install.sh