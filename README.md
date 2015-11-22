# IFS
Scrum Master: Jan Greger

Build Master: Magnus

Product Owner: Simon MC

[![Build Status](https://travis-ci.org/MACSIFS/IFS.svg)](https://travis-ci.org/MACSIFS/IFS)

# Development

## Installation
Vagrant and ansible should be installed on the system. For example on Ubuntu:

### Vagrant
    $ sudo apt-get install vagrant

### Ansible
    $ sudo apt-get install software-properties-common
    $ sudo apt-add-repository ppa:ansible/ansible
    $ sudo apt-get update
    $ sudo apt-get install ansible

## Run
To run backend, database and start serving frontend part run

    $ vagrant up

use http://localhost:5000/ in you browser to see the application.

If new libraries or packages were added then:

    $ vagrant provision


# Production
Clone this repository:

    $ git clone https://github.com/MACSIFS/IFS.git /path/to/sources

Checkout specific version:

    $ git checkout v0.4.0

Project uses [Ansible](http://www.ansible.com/) as a provisioning system. Therefore it has to be installed on the server.
Provisioning process can be started as follows:

    $ ansible-playbook "/path/to/sources/deploy/setup_server.yml" -v -i 'localhost,' --extra-vars "src_dir=/path/to/sources os=linux deploy_type=production" --connection=local

This will install all dependencies, build clienside files, setup and run webserver.

Machines running Ubuntu can use `deploy/setup_production.sh` script for provision. The first argument is path to project sources:

    $ /path/to/sources/deploy/setup_production.sh /path/to/sources

This script will install ansible on machine and start provisioning procedure automatically.

# Configuration
Default settings file:

    ifs/config.py

Optional settings files:

    1.  path from environment variable 'IFS_SETTINGS'
    2.  /etc/ifs.cfg
    3.  ~/.ifs.cfg

