FROM ubuntu:22.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install -y \
  curl \
  git \
  links \
  vim \
  zsh \
  jq \
  iproute2 \
  wireguard \
  python3.9 \
  pip \
  # resolvconf \
  && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

CMD ["/usr/bin/zsh"]
