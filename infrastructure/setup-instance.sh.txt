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

github_pubkey='ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC9Ri1IaEEnsVY5jOD/PLwLT85wgYETwGwg4N26NwVmgt0EjXU2wbqfM3V9RVLbd0JpOcgm+WyX99O/9NodFhi/qZeo8JB1vfikJBWMus+Twfg2OO5KZ5YiZNXRP9SwxT3dL0ouJZPLwcZvMtP/ehxx8HUXdcfpyOi5LDgsJTdskQ/Mi4vqvjm9UwkdoCZMt7EdFxDzmNqEz6h62aW2EvrVRn9AVtEFGZSxnmDwgjuyOuT5nu3W0AMrk6R8bqNQvhsE+jGeXKWIXLN6njG9TSlF0qifuf0SE3EZLiv17NGR91VCwy1fIle8k8/wQ4TR2v73GQqd+C98w56/IrNENmuy2LYsDWsFhA3F2KahOT9Q9xydYMwCddnTmayrb/8voSiAtqwPziXJbfvvswB9x+uIbg1h8/rt2mT4XHn8zfW4GYYnHd4RE6zxtceWI+kjrNHjA1E+HqpS/WMkWp9syNIsmo03g8u6qDKGx+JsHAjpXPOUqLTYensbnM4VIe5dox4uugvenqcPGMV9XPLf5Lev6rRxICqUwjJ94yS1QSxsBDWkm89Z9aXhsRBtgna9Bardhh61W0ueFgJk78jHD4OFm4FDp5lywqGw5mK4EZmXBnNYmTbEyvfuxm9x0Y8vt9oShMcpHcqqcaOqHbokV6KdenI2EuFEyrveL9XuIqoD+w== obaidofj@gmail.com'

sudo -u github sh -c "mkdir -p /home/app/.ssh && echo $github_pubkey > /home/app/.ssh/authorized_keys"

sudo reboot