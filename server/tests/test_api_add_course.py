import json

from server.tests.base import BaseTestCase
from server.models import db, Lecturer, Course, Lecture


class AddCourseApiTest(BaseTestCase):
    def setUp(self):
        super(AddCourseApiTest, self).setUp()

        self.simon = Lecturer('simon', '1234', 'Simon', 'McCallum')
        db.session.add(self.simon)

        imt3601 = Course('IMT3601 - Game Programming', self.simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        self.frode = Lecturer('frode', '1234', 'Frode', 'Haug')
        db.session.add(self.frode)

        imt1031 = Course('IMT1031 - Grunnleggende Programmering', self.frode)
        db.session.add(imt1031)

        imt1031_l1 = Lecture('Lecture 1', imt1031)
        db.session.add(imt1031_l1)

        db.session.commit()

    def test_wrong_lecturer(self):
        self.login(self.simon.email, self.simon.password)

        res = self.client.post('/api/0/courses', data=dict(
            lecturerId=self.frode.id,
            name='awsm'
        ))

        self.assert403(res)

    def test_no_lecturer(self):
        self.login(self.simon.email, self.simon.password)

        res = self.client.post('/api/0/courses', data=dict(
            name='awsm'
        ))

        self.assert400(res)

    def test_no_name(self):
        self.login(self.simon.email, self.simon.password)

        res = self.client.post('/api/0/courses', data=dict(
            lecturerId=self.simon.id
        ))

        self.assert400(res)

    def test_success(self):
        self.login(self.simon.email, self.simon.password)

        res = self.client.post('/api/0/courses', data=dict(
            lecturerId=self.simon.id,
            name='awsm'
        ))
        self.assert200(res)

        data = json.loads(res.data.decode('utf-8'))

        self.assertIsNotNone(data)
        self.assertIn('id', data)
        self.assertEqual(data['id'], 3) # It's the third course, so it should be 3

        awsmCourse = Course.query.filter(Course.id == data['id']).first()
        self.assertFalse(awsmCourse is None)
        self.assertEqual(awsmCourse.name, 'awsm')
        self.assertEqual(awsmCourse.lecturer_id, self.simon.id)
