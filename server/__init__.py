import os
from uuid import uuid1
from functools import wraps

from flask import Flask
from flask import request
from flask import g

from .util import transactional
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

    def transactional_middleware(app):

        @transactional
        def transactional_call(environ, start_response):
            return app(environ, start_response)

        @wraps(app)
        def inner(environ, start_response):
            if environ['REQUEST_METHOD'] in {'POST', 'PUT', 'DELETE'}:
                return transactional_call(environ, start_response)
            else:
                return app(environ, start_response)
        return inner

    app.wsgi_app = transactional_middleware(app.wsgi_app)
    return app
