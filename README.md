# IFS
Scrum Master: Jan Greger

Build Master: Magnus

Product Owner: Simon MC

## Installation
Vagrant and ansible should be installed on the system. For example on Ubuntu:

### Vagrant
    $ sudo apt-get install vagrant

### Ansible
    $ sudo apt-get install software-properties-common
    $ sudo apt-add-repository ppa:ansible/ansible
    $ sudo apt-get update
    $ sudo apt-get install ansible

## Configuration
Default settings file:

    ifs/config.py

Optional settings files:

    1.  path from environment variable 'IFS_SETTINGS'
    2.  /etc/ifs.cfg
    3.  ~/.ifs.cfg

## Run
To run backend, database and start serving frontend part run

    $ vagrant up

use http://localhost:5000/ in you browser to see the application.

If new libraries or packages were added then:

    $ vagrant provision
