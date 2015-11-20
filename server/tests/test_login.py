import json

from server.models import Lecturer, db
from server.auth.util import hash_password
from server.tests.base import BaseTestCase


class LoginTest(BaseTestCase):
    def setUp(self):
        super(LoginTest, self).setUp()
        self.simon = Lecturer('simon', hash_password('1234'), 'Simon', 'McCallum')
        db.session.add(self.simon)

        db.session.flush()

    def test_success(self):
        res = self.client.post('/auth/login', data={'user_name': 'simon', 'password': '1234'})
        assert res.status_code == 200

        res = self.client.get('/auth/login')
        assert res.status_code == 200

        data = json.loads(res.data.decode('utf-8'))
        assert data['name'] == self.simon.full_name

    def test_failed(self):
        res = self.client.post('/auth/login', data={'user_name': 'test', 'password': '1234'})
        assert res.status_code == 401

        res = self.client.get('/auth/login')
        assert res.status_code == 401

