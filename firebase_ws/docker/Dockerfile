# Base Image : https://hub.docker.com/_/ubuntu/tags
FROM ubuntu:22.04

LABEL org.opencontainers.image.authors="yuzhong1214@gmail.com"

ARG USERNAME=user
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
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

COPY .bashrc /home/$USERNAME/.bashrc

USER $USERNAME
CMD ["/bin/bash"]

RUN git clone https://github.com/YuZhong-Chen/.setup_env.git ~/.setup_env && \
    cd ~/.setup_env && ./install.sh