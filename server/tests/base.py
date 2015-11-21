from server import create_app
from server.models import db

from flask.ext.testing import TestCase


class BaseTestCase(TestCase):
    def create_app(self):
        return create_app({'SQLALCHEMY_DATABASE_URI': 'sqlite://'})

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def login(self, user_name, password):
        self.client.post('/api/0/auth/login', data={'user_name': user_name, 'password': password})
