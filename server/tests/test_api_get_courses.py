import json

import dateutil.parser

from server.tests.base import BaseTestCase
from server.models import db, Lecturer, Course, Lecture, Comment


class GetCourseListApiTest(BaseTestCase):
    def setUp(self):
        super(GetCourseListApiTest, self).setUp()

        self.simon = Lecturer('simon', '1234', 'Simon', 'McCallum')
        db.session.add(self.simon)

        self.imt3601 = Course('IMT3601 - Game Programming', self.simon)
        db.session.add(self.imt3601)

        imt3601_l1 = Lecture('Lecture 1', self.imt3601)
        db.session.add(imt3601_l1)

        self.frode = Lecturer('frode', '1234', 'Frode', 'Haug')
        db.session.add(self.frode)

        self.imt1031 = Course('IMT1031 - Grunnleggende Programmering', self.frode)
        db.session.add(self.imt1031)

        imt1031_l1 = Lecture('Lecture 1', self.imt1031)
        db.session.add(imt1031_l1)

        db.session.commit()

    def test_success(self):
        res = self.client.get('/api/0/courses')
        self.assert200(res)

    def test_response_format(self):
        res = self.client.get('/api/0/courses')
        self.assertEqual(res.headers['Content-Type'], 'application/json')

    def test_response_is_list(self):
        res = self.client.get('/api/0/courses')
        response = json.loads(res.data.decode('utf-8'))
        self.assertIsInstance(response, list)

    def test_content(self):
        res = self.client.get('/api/0/courses')
        response = json.loads(res.data.decode('utf-8'))

        self.assertEqual(len(response), 2)
        self.assertEqual(response[0]['id'], self.imt3601.id)
        self.assertEqual(response[1]['id'], self.imt1031.id)
        self.assertEqual(response[0]['name'], self.imt3601.name)
        self.assertEqual(response[1]['name'], self.imt1031.name)

    def test_valid_lecturer_filter(self):
        res = self.client.get('/api/0/courses?lecturer={}'.format(self.simon.id))
        response = json.loads(res.data.decode('utf-8'))

        self.assertEqual(len(response), 1)
        self.assertEqual(response[0]['id'], self.imt3601.id)
        self.assertEqual(response[0]['name'], self.imt3601.name)

        res = self.client.get('/api/0/courses?lecturer={}'.format(self.frode.id))
        response = json.loads(res.data.decode('utf-8'))

        self.assertEqual(len(response), 1)
        self.assertEqual(response[0]['id'], self.imt1031.id)
        self.assertEqual(response[0]['name'], self.imt1031.name)

        res = self.client.get('/api/0/courses?lecturer=0')
        response = json.loads(res.data.decode('utf-8'))

        self.assertEqual(len(response), 0)

    def test_invalid_lecturer_filter(self):
        res = self.client.get('/api/0/courses?lecturer=hello')
        self.assert400(res)
