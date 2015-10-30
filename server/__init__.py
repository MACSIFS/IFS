from os import path

from flask import Flask

from .models import db
from .main.main import main

app = Flask(__name__)

app.config.from_object('config')
if not app.config.from_envvar('IFS_SETTINGS', silent=True):
    app.config.from_pyfile('/etc/ifs.cfg', silent=True)
    app.config.from_pyfile(path.expanduser('~/.ifs.cfg'), silent=True)

app.register_blueprint(main)

db.init_app(app)
