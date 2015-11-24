import json

from server.models import Lecturer, db, Course, Lecture
from server.tests.base import BaseTestCase


class LoginTest(BaseTestCase):
    def setUp(self):
        super(LoginTest, self).setUp()
        self.simon = Lecturer('simon', '1234', 'Simon', 'McCallum')
        db.session.add(self.simon)

        imt3601 = Course('IMT3601 - Game Programming', self.simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        db.session.flush()

    def test_login_success(self):
        res = self.client.post('/api/0/auth/login', data={'email': 'simon', 'password': '1234'})
        self.assert200(res)

        res = self.client.get('/api/0/auth/login')
        self.assert200(res)

        data = json.loads(res.data.decode('utf-8'))
        self.assertTrue(data['username'] == self.simon.full_name)

    def test_login_failed(self):
        res = self.client.post('/api/0/auth/login', data={'email': 'test', 'password': '1234'})
        self.assert403(res)

        res = self.client.get('/api/0/auth/login')
        self.assert403(res)

    def test_logout(self):
        res = self.client.post('/api/0/auth/login', data={'email': 'simon', 'password': '1234'})
        self.assert200(res)

        res = self.client.post('/api/0/auth/logout')
        self.assert_status(res, 204)

        res = self.client.get('/api/0/auth/login')
        self.assert403(res)

    def test_success_restricted_access(self):
        self.client.post('/api/0/auth/login', data={'email': 'simon', 'password': '1234'})
        res = self.client.get('/api/0/lectures/1/engagements')
        self.assert200(res)

    def test_failed_restricted_access(self):
        self.client.post('/api/0/auth/login', data={'email': 'test', 'password': '1234'})
        res = self.client.get('/api/0/lectures/1/engagements')
        self.assert401(res)
