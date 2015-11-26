import json

from server.tests.base import BaseTestCase
from server.models import db, Lecturer, Course, Lecture


class AddLectureApiTest(BaseTestCase):
    def setUp(self):
        super(AddLectureApiTest, self).setUp()

        self.simon = Lecturer('simon', '1234', 'Simon', 'McCallum')
        db.session.add(self.simon)

        imt3601 = Course('IMT3601 - Game Programming', self.simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        self.frode = Lecturer('frode', '1234', 'Frode', 'Haug')
        db.session.add(self.frode)

        self.imt1031 = Course('IMT1031 - Grunnleggende Programmering', self.frode)
        db.session.add(self.imt1031)

        self.imt1031_l1 = Lecture('Lecture 1', self.imt1031)
        db.session.add(self.imt1031_l1)
        
        self.imt1031_l2 = Lecture('Lecture 2', self.imt1031)
        db.session.add(self.imt1031_l2)
        
        self.imt1031_l3 = Lecture('Lecture 3', self.imt1031)
        db.session.add(self.imt1031_l3)

        db.session.commit()


    def test_no_lecturer(self):
        self.login(self.simon.email, self.simon.password)

        res = self.client.post('/api/0/lectures', data=dict(
            name='awsm'
        ))

        self.assert400(res)

    def test_no_name(self):
        self.login(self.simon.email, self.simon.password)

        res = self.client.post('/api/0/lectures', data=dict(
            lecturerId=self.simon.id
        ))

        self.assert400(res)

    def test_success(self):
        self.login(self.simon.email, self.simon.password)

        res = self.client.post('/api/0/lectures', data=dict(
            courseId=self.imt1031.id,
            name='awsm'
        ))
        self.assert200(res)

        data = json.loads(res.data.decode('utf-8'))

        self.assertIsNotNone(data)
        self.assertIn('id', data)
        self.assertEqual(data['id'], 5) # It's the firft Lecture, so it should be 5

        awsmLecture = Lecture.query.filter(Lecture.id == data['id']).first()
        self.assertFalse(awsmLecture is None)
        self.assertEqual(awsmLecture.name, 'awsm')
        self.assertEqual(awsmLecture.course_id, self.imt1031.id)
