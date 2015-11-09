import json
from server.tests.base import BaseTestCase
from server.models import db, Lecturer, Course, Lecture, Comment


class GetCommentsApiTest(BaseTestCase):
    def setUp(self):
        super(GetCommentsApiTest, self).setUp()

        simon = Lecturer('Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        imt3601_l1_c1 = Comment('This is boring', imt3601_l1)
        imt3601_l1_c2 = Comment('This is fun!', imt3601_l1)
        db.session.add(imt3601_l1_c1)
        db.session.add(imt3601_l1_c2)

        db.session.commit()

    def test_success(self):
        rv = self.app.get('/api/0/lectures/1/comments')
        assert rv.status_code == 200

    def test_lecture_not_found(self):
        rv = self.app.get('/api/0/lectures/2/comments')
        assert rv.status_code == 404

    def test_list(self):
        rv = self.app.get('/api/0/lectures/1/comments')
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))
        assert len(response['comments']) == 2

    def test_content(self):
        rv = self.app.get('/api/0/lectures/1/comments')
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))

        assert response['comments'][0]['content'] == 'This is boring'
