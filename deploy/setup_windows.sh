apt-get update -qq
apt-get install -y python-pip
pip install ansible

ansible-playbook /vagrant/deploy/setup_server.yml -v -i /vagrant/deploy/hosts-windows
