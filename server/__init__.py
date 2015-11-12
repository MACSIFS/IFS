import os

from flask import Flask

from .models import db
from .main.main import main
from .resources import api


def create_app(config=None):
    app = Flask(__name__)

    app.config.from_object('config')

    if not app.config.from_envvar('IFS_SETTINGS', silent=True):
        app.config.from_pyfile('/etc/ifs.cfg', silent=True)
        app.config.from_pyfile(os.path.expanduser('~/.ifs.cfg'), silent=True)

    if config:
        app.config.update(config)

    app.register_blueprint(main)

    db.init_app(app)
    api.init_app(app)

    return app
