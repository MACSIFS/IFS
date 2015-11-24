import json
from uuid import uuid1
from datetime import datetime, timedelta

import dateutil.parser

from server.tests.base import BaseTestCase
from server.models import db, Lecturer, Course, Lecture, Comment, Engagement


class GetCourseListApiTest(BaseTestCase):
    def setUp(self):
        super(GetCourseListApiTest, self).setUp()

        simon = Lecturer('simon', '1234', 'Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        frode = Lecturer('frode', '1234', 'Frode', 'Haug')
        db.session.add(frode)

        imt1031 = Course('IMT1031 - Grunnleggende Programmering', frode)
        db.session.add(frode)

        imt1031_l1 = Lecture('Lecture 1', imt1031)
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
        self.assertEqual(response[0]['id'], 1)
        self.assertEqual(response[1]['id'], 2)
        self.assertEqual(response[0]['name'], 'IMT3601 - Game Programming')
        self.assertEqual(response[1]['name'], 'IMT1031 - Grunnleggende Programmering')

    def test_valid_lecturer_filter(self):
        res = self.client.get('/api/0/courses?lecturer=1')
        response = json.loads(res.data.decode('utf-8'))

        self.assertEqual(len(response), 1)
        self.assertEqual(response[0]['id'], 1)
        self.assertEqual(response[0]['name'], 'IMT3601 - Game Programming')

        res = self.client.get('/api/0/courses?lecturer=2')
        response = json.loads(res.data.decode('utf-8'))

        self.assertEqual(len(response), 1)
        self.assertEqual(response[0]['id'], 2)
        self.assertEqual(response[0]['name'], 'IMT1031 - Grunnleggende Programmering')

        res = self.client.get('/api/0/courses?lecturer=0')
        response = json.loads(res.data.decode('utf-8'))

        self.assertEqual(len(response), 0)

    def test_invalid_lecturer_filter(self):
        res = self.client.get('/api/0/courses?lecturer=hello')
        self.assert400(res)
