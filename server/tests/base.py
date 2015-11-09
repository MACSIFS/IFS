import tempfile
import unittest
import os
from server import app
from server.models import db


class BaseTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, self.test_db_path = tempfile.mkstemp('.db')
        # test_db_uri = 'sqlite:///{}'.format(self.test_db_path)
        # app.config['SQLALCHEMY_DATABASE_URI'] = test_db_uri
        app.config['TESTING'] = True
        self.app = app.test_client()

        db.drop_all()
        db.create_all()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(self.test_db_path)
