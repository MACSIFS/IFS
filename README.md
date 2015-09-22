# IFS
Scrum Master: Jan Greger

Build Master: Magnus

Product Owner: Simon MC

## Installation
    $ pip install -r requirements.txt

## Configuration
Default settings file:

    ifs/config.py

Optional settings files:

    1.  path from environment variable 'IFS_SETTINGS'
    2.  /etc/ifs.cfg
    3.  ~/.ifs.cfg

## Run

Clean and initialize database:

    python manage.py init_db

Run application:

    python manage.py runserver

For available options:

    python manage.py runserver --help
