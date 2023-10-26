#!/bin/sh
set -e

sudo apt update
sudo apt upgrade -y

sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings

# install docker
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# create github user
sudo mkdir -p /home/app
sudo useradd --no-create-home --home-dir /home/app --shell /bin/bash github
sudo usermod --append --groups docker github
sudo usermod --append --groups docker ubuntu
sudo chown github:github -R /home/app

github_pubkey='ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCqB09WopOPu05C7YfGfrsG28wqTRVQ4K52FOcuZnqdysPDSLXdol49ZcdLWLGj7I/zSUIb/r5ITKD6sQca1muVp+pwnQebGoHQqweGq+qbsI04PaBuowoL6DQtgSeTf8wUgb3h2Wr3G7+LGiAqvgh2UfuUhJIytncD4j/8rCKdClDF0+7OIrbzUO49O0HGNq+N0d/ySWGe8FsabCCF0VxMnDCJPZ8DrrkE0Dvzl/XI3XmVodE2pOw2wLGREX7yDoYmt6x9JFj6k84tHeH2pmGVeRVi11MhDo48nQJu2bP+mWY0Kl+bhRUtQe08fFGgJ5nzBTOya8MqoXsRagOh9xZzwfp69MitdLZyjwMN1qJA/m7OmIrb2ZfFxQofe1Wb/gJSjjfTfVLlXx4Iw7JraLMvmXJZl2V1d8RbndldruZ9Cfwy6/SQ17Kf8s07Rixg2B3VcsKrKUBC7W+DmAIjJSOB7TT6Ddv2Buh7XJohZaDhvo6vPfYVc8PQcIfZrQ+ZYlb24phPkvLGxOu9bsEdMRIMMMJ24dLgdAYePoXkYkvp+QcQdlhar+xN8IHyOcE625igmlDLGrrz9hsRQrH5xr1ly1Yxa8gJDeRPymmXiyUD1fvskXhOWl0ToerKTGb895MQRPrYO+ZlO+Z5EOByvGeHBrN59v20ljwABJ82c1D0ow== mohammad@mohammad-VivoBook-ASUSLaptop-X515EP-X515EP'

sudo -u github sh -c "mkdir -p /home/app/.ssh && echo $github_pubkey > /home/app/.ssh/authorized_keys"

sudo reboot