from uuid import uuid1

from flask.ext.testing import TestCase

from server import create_app
from server.models import db

from server.api.v0.api import api
from server.api.v0.auth import LoginResource


def generate_client_id():
    return str(uuid1())


class BaseTestCase(TestCase):
    def create_app(self):
        return create_app({'SQLALCHEMY_DATABASE_URI': 'sqlite://'})

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def login(self, email, password):
        self.client.post(
            api.url_for(LoginResource, email=email, password=password)
        )

    def find_client_id_cookie(self):
        client_id = None
        for cookie in self.client.cookie_jar:
            if cookie.name == 'client_id':
                client_id = cookie.value
        return client_id

    def set_client_id_cookie(self, id):
        self.client.set_cookie('localhost', 'client_id', id)

    def set_generated_client_id_cookie(self):
        id = generate_client_id()
        self.set_client_id_cookie(id)
        return id
