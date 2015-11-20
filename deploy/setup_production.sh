#!/usr/bin/env bash
SRC_DIR=$1

apt-get update -qq
apt-get install -y python-pip
pip install ansible

ansible-playbook "$SRC_DIR/deploy/setup_server.yml" -v -i 'localhost,' --extra-vars "src_dir=$SRC_DIR os=linux deploy_type=production" --connection=local
