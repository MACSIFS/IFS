import json
from datetime import datetime
from server.tests.base import BaseTestCase
from server.models import db, Lecturer, Course, Lecture, Comment, Engagement


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
        rv = self.client.get('/api/0/lectures/1/comments')
        assert rv.status_code == 200

    def test_lecture_not_found(self):
        rv = self.client.get('/api/0/lectures/2/comments')
        assert rv.status_code == 404

    def test_list(self):
        rv = self.client.get('/api/0/lectures/1/comments')
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))
        assert len(response['comments']) == 2

    def test_content(self):
        rv = self.client.get('/api/0/lectures/1/comments')
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))

        assert response['comments'][0]['content'] == 'This is boring'


class PostCommentsApiTest(BaseTestCase):
    def setUp(self):
        super(PostCommentsApiTest, self).setUp()

        simon = Lecturer('Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        db.session.commit()

    def test_success(self):
        rv = self.client.post('/api/0/lectures/1/comments', data=dict(
            data='hello!'
        ))
        assert rv.status_code == 200

    def test_response(self):
        rv = self.client.post('/api/0/lectures/1/comments', data=dict(
            data='hello!'
        ))
        assert rv.status_code == 200

        response = json.loads(rv.data.decode('utf-8'))
        assert 'id' in response
        assert response['id'] >= 0

    def test_lecture_not_found(self):
        rv = self.client.post('/api/0/lectures/2/comments')
        assert rv.status_code == 404

    def test_no_data(self):
        rv = self.client.post('/api/0/lectures/1/comments')
        assert rv.status_code == 400


class GetLectureApiTest(BaseTestCase):
    def setUp(self):
        super(GetLectureApiTest, self).setUp()

        simon = Lecturer('Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        db.session.commit()

    def test_success(self):
        rv = self.client.get('/api/0/lectures/1')
        assert rv.status_code == 200

    def test_lecture_not_found(self):
        rv = self.client.get('/api/0/lectures/2')
        assert rv.status_code == 404

    def test_content(self):
        rv = self.client.get('/api/0/lectures/1')
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))

        assert response['id'] == 1
        assert response['name'] == 'Lecture 1'
        assert response['courseId'] == 1


class AddEngagementApiTest(BaseTestCase):
    def setUp(self):
        super(AddEngagementApiTest, self).setUp()

        simon = Lecturer('Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        db.session.commit()

    def test_success(self):
        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = 0.5,
            interest = 0.5,
            time = '2015-11-16T20:12:18.843Z'
        ))
        assert rv.status_code == 200

    def test_lecture_not_found(self):
        rv = self.client.post('/api/0/lectures/2/engagements')
        assert rv.status_code == 404

    def test_missing_data(self):
        rv = self.client.post('/api/0/lectures/1/engagements')
        assert rv.status_code == 400

        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            interest = 0.5,
            time = '2015-11-16T20:12:18.843Z'
        ))
        assert rv.status_code == 400

        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = 0.5,
            time = '2015-11-16T20:12:18.843Z'
        ))
        assert rv.status_code == 400

        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = 0.5,
            interest = 0.5
        ))
        assert rv.status_code == 400

    def test_invalid_challenge(self):
        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = 2,
            interest = 0.5,
            time = '2015-11-16T20:12:18.843Z'
        ))
        assert rv.status_code == 400

        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = -1,
            interest = 0.5,
            time = '2015-11-16T20:12:18.843Z'
        ))
        assert rv.status_code == 400

        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = 'hello',
            interest = 0.5,
            time = '2015-11-16T20:12:18.843Z'
        ))
        assert rv.status_code == 400

    def test_invalid_interest(self):
        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = 0.5,
            interest = 2,
            time = '2015-11-16T20:12:18.843Z'
        ))
        assert rv.status_code == 400

        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = 0.5,
            interest = -1,
            time = '2015-11-16T20:12:18.843Z'
        ))
        assert rv.status_code == 400

        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = 0.5,
            interest = 'hello',
            time = '2015-11-16T20:12:18.843Z'
        ))
        assert rv.status_code == 400

    def test_invalid_time(self):
        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = 0.5,
            interest = 0.5,
            time = 'hello'
        ))
        assert rv.status_code == 400

    def test_content(self):
        rv = self.client.post('/api/0/lectures/1/engagements', data=dict(
            challenge = 0.5,
            interest = 0.5,
            time = '2015-11-16T20:12:18.843Z'
        ))
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))

        assert 'id' in response
        assert response['id'] == 1


class SetCommentRatingApiTetst(BaseTestCase):
    def setUp(self):
        super(SetCommentRatingApiTetst, self).setUp()

        simon = Lecturer('Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        imt3601_l1_c1 = Comment('This is boring', imt3601_l1)
        db.session.add(imt3601_l1_c1)

        db.session.commit()

    def test_success(self):
        rv = self.client.post('/api/0/lectures/1/comments/1/rating', data=dict(
            rating=1
        ))
        assert rv.status_code == 200

    def test_lecture_not_found(self):
        rv = self.client.post('/api/0/lectures/2/comments/1/rating')
        assert rv.status_code == 404

    def test_comment_not_found(self):
        rv = self.client.post('/api/0/lectures/1/comments/2/rating')
        assert rv.status_code == 404

    def test_no_data(self):
        rv = self.client.post('/api/0/lectures/1/comments/1/rating')
        assert rv.status_code == 400

    def test_valid_rating(self):
        def post_rating(rating):
            rv = self.client.post('/api/0/lectures/1/comments/1/rating', data=dict(
                rating=rating
            ))
            return rv

        rv = post_rating(0)
        assert rv.status_code == 200

        rv = post_rating(-1)
        assert rv.status_code == 200

        rv = post_rating(1)
        assert rv.status_code == 200

        rv = post_rating(-2)
        assert rv.status_code == 400

        rv = post_rating(2)
        assert rv.status_code == 400

        rv = post_rating(0.5)
        assert rv.status_code == 400
