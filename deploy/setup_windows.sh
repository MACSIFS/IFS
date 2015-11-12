apt-get update -qq
apt-get install -y python-pip
pip install ansible

ansible-playbook /vagrant/deploy/setup_server.yml -v -i 'localhost,' --extra-vars 'src_dir=/vagrant' --connection=local
