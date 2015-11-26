import os
from uuid import uuid1

from flask import Flask
from flask import request
from flask import g
from flask.ext.login import LoginManager

from .models import db, Lecturer
from .main.main import main
from .api.v0.api import api_bp


def create_app(config=None):
    app = Flask(__name__)

    app.config.from_object('config')

    if not app.config.from_envvar('IFS_SETTINGS', silent=True):
        app.config.from_pyfile('/etc/ifs.cfg', silent=True)
        app.config.from_pyfile(os.path.expanduser('~/.ifs.cfg'), silent=True)

    if config:
        app.config.update(config)

    app.register_blueprint(main)
    app.register_blueprint(api_bp, url_prefix='/api/0')

    db.init_app(app)

    login_manager = LoginManager()
    login_manager.init_app(app)

    @app.before_request
    def detect_client_id():
        g.client_id = request.cookies.get('client_id')
        if g.client_id is None:
            g.client_id = str(uuid1())
            g.set_client_id_cookie = True

    @app.after_request
    def set_client_id(response):
        if g.get('set_client_id_cookie', False):
            response.set_cookie('client_id', g.client_id)
        return response

    @login_manager.user_loader
    def load_user(user_id):
        try:
            return db.session.query(Lecturer).get(int(user_id))
        except (TypeError, ValueError):
            return

    return app
