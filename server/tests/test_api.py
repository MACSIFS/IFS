import json
from datetime import datetime, timedelta

import dateutil.parser

from server.tests.base import BaseTestCase
from server.models import db, Lecturer, Course, Lecture, Comment, Engagement
from server.models import CommentRating
from uuid import uuid1


def generate_client_id():
    return str(uuid1())


def set_client_id_cookie(client, id):
    client.set_cookie('localhost', 'client_id', id)


def set_generated_client_id_cookie(client):
    id = generate_client_id()
    set_client_id_cookie(client, id)
    return id


def find_client_id_cookie(client):
    client_id = None
    for cookie in client.cookie_jar:
        if cookie.name == 'client_id':
            client_id = cookie.value
    return client_id


class GetCommentsApiTest(BaseTestCase):
    def setUp(self):
        super(GetCommentsApiTest, self).setUp()

        simon = Lecturer('Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        self.submissionTime = datetime.utcnow()

        imt3601_l1_c1 = Comment('This is boring', self.submissionTime, imt3601_l1)
        imt3601_l1_c2 = Comment('This is fun!', self.submissionTime, imt3601_l1)
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

    def test_submission_time(self):
        rv = self.client.get('/api/0/lectures/1/comments')
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))

        timeString = response['comments'][0]['submissionTime']
        time = dateutil.parser.parse(timeString)
        assert time == self.submissionTime


class GetCommentsWithRatingApiTest(BaseTestCase):
    def _find_client_id_cookie(self):
        return find_client_id_cookie(self.client)

    def _set_client_id_cookie(self, id):
        set_client_id_cookie(self.client, id)

    def _set_generated_client_id_cookie(self):
        return set_generated_client_id_cookie(self.client)

    def setUp(self):
        super(GetCommentsWithRatingApiTest, self).setUp()

        simon = Lecturer('Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        imt3601_l1_c1 = Comment('This is boring', datetime.utcnow(), imt3601_l1)
        db.session.add(imt3601_l1_c1)

        db.session.commit()

        self.comment = imt3601_l1_c1
        self.lecture = imt3601_l1

    def test_no_rating(self):
        rv = self.client.get('/api/0/lectures/1/comments')
        response = json.loads(rv.data.decode('utf-8'))
        assert response['comments'][0]['rating'] == 0

    def test_one_rating(self):
        user_id = self._set_generated_client_id_cookie()

        db.session.add(CommentRating(1, user_id, self.comment, self.lecture))
        db.session.commit()

        rv = self.client.get('/api/0/lectures/1/comments')
        response = json.loads(rv.data.decode('utf-8'))
        assert response['comments'][0]['rating'] == 1

    def test_two_ratings(self):
        user_id1 = generate_client_id()
        user_id2 = generate_client_id()

        db.session.add(CommentRating(1, user_id1, self.comment, self.lecture))
        db.session.add(CommentRating(-1, user_id2, self.comment, self.lecture))
        db.session.commit()

        self._set_client_id_cookie(user_id1)
        rv = self.client.get('/api/0/lectures/1/comments')
        response = json.loads(rv.data.decode('utf-8'))
        assert response['comments'][0]['rating'] == 1

        self._set_client_id_cookie(user_id2)
        rv = self.client.get('/api/0/lectures/1/comments')
        response = json.loads(rv.data.decode('utf-8'))
        assert response['comments'][0]['rating'] == -1

    def test_default_rating(self):
        user_id = generate_client_id()

        db.session.add(CommentRating(1, user_id, self.comment, self.lecture))
        db.session.commit()

        self._set_generated_client_id_cookie()
        rv = self.client.get('/api/0/lectures/1/comments')
        response = json.loads(rv.data.decode('utf-8'))
        assert response['comments'][0]['rating'] == 0

    def test_one_user_two_ratings(self):
        user_id = generate_client_id()

        comment2 = Comment('Great!', datetime.utcnow(), self.lecture)
        db.session.add(comment2)

        db.session.add(CommentRating(1, user_id, self.comment, self.lecture))
        db.session.commit()

        db.session.add(CommentRating(-1, user_id, comment2, self.lecture))
        db.session.commit()

        self._set_client_id_cookie(user_id)
        rv = self.client.get('/api/0/lectures/1/comments')
        response = json.loads(rv.data.decode('utf-8'))
        assert len(response['comments']) == 2
        assert response['comments'][0]['rating'] == 1
        assert response['comments'][1]['rating'] == -1


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

    def test_submission_time(self):
        presubmission_time = datetime.utcnow()

        rv = self.client.post('/api/0/lectures/1/comments', data=dict(
            data='hello!'
        ))
        assert rv.status_code == 200

        comment = Comment.query.filter(Comment.id == 1).first()

        assert (comment.submissiontime - presubmission_time) < timedelta(minutes=1)

    def test_max_chars_limit(self):
        content = '.' * 1000
        res = self.client.post('/api/0/lectures/1/comments', data=dict(
            data=content
        ))
        assert res.status_code == 200

        comment = Comment.query.filter(Comment.id == 1).first()

        assert len(comment.content) == 500
        assert comment.content == content[:500]


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


class GetEngagementsApiTest(BaseTestCase):
    def setUp(self):
        super(GetEngagementsApiTest, self).setUp()

        simon = Lecturer('Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        db.session.commit()

        self.lecture = imt3601_l1

    def test_success(self):
        rv = self.client.get('/api/0/lectures/1/engagements')
        assert rv.status_code == 200

    def test_lecture_not_found(self):
        rv = self.client.get('/api/0/lectures/2/engagements')
        assert rv.status_code == 404

    def test_no_engagements(self):
        rv = self.client.get('/api/0/lectures/1/engagements')
        assert rv.status_code == 200
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))
        assert isinstance(response, list)

        assert len(response) == 0

    def test_engagement_content(self):
        user_id = set_generated_client_id_cookie(self.client)
        db.session.add(Engagement(0.3, 0.6, datetime(2015, 11, 19), user_id, self.lecture))
        db.session.commit()

        rv = self.client.get('/api/0/lectures/1/engagements')
        assert rv.status_code == 200
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))
        assert isinstance(response, list)

        assert len(response) == 1

        assert response[0]['id'] == 1
        assert response[0]['userID'] == user_id
        assert response[0]['interest'] == 0.6
        assert response[0]['challenge'] == 0.3
        assert dateutil.parser.parse(response[0]['time']) == datetime(2015, 11, 19)

    def test_several_engagements(self):
        user_id = set_generated_client_id_cookie(self.client)
        starttime = datetime(2015, 11, 19, 10)
        for i in range(0, 10):
            time = starttime + timedelta(minutes=10*i)
            interest = 1
            challenge = 0
            eng = Engagement(challenge, interest, time, user_id, self.lecture)
            db.session.add(eng)
        db.session.commit()

        rv = self.client.get('/api/0/lectures/1/engagements')
        assert rv.status_code == 200
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))
        assert isinstance(response, list)

        assert len(response) == 10

    def test_only_last(self):
        starttime = datetime(2015, 11, 19, 10)
        for user in range(0, 2):
            set_client_id_cookie(self.client, str(user))
            for i in range(0, 10):
                time = starttime + timedelta(minutes=10*i)
                interest = 1
                challenge = 0
                eng = Engagement(challenge, interest, time, str(user), self.lecture)
                db.session.add(eng)
        db.session.commit()

        rv = self.client.get('/api/0/lectures/1/engagements?last=true')
        assert rv.status_code == 200
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))
        assert isinstance(response, list)

        assert len(response) == 2

        last_time = starttime + timedelta(minutes=10*9)
        for engagement in response:
            assert dateutil.parser.parse(engagement['time']) == last_time

    def test_last_false(self):
        starttime = datetime(2015, 11, 19, 10)
        for user in range(0, 2):
            set_client_id_cookie(self.client, str(user))
            for i in range(0, 10):
                time = starttime + timedelta(minutes=10*i)
                interest = 1
                challenge = 0
                eng = Engagement(challenge, interest, time, str(user), self.lecture)
                db.session.add(eng)
        db.session.commit()

        rv = self.client.get('/api/0/lectures/1/engagements?last=false')
        assert rv.status_code == 200
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))
        assert isinstance(response, list)

        assert len(response) == 20


class SetCommentRatingApiTest(BaseTestCase):
    def setUp(self):
        super(SetCommentRatingApiTest, self).setUp()

        simon = Lecturer('Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        imt3601_l1_c1 = Comment('This is boring', datetime.utcnow(), imt3601_l1)
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


class GetCommentRatingApiTest(BaseTestCase):
    def setUp(self):
        super(GetCommentRatingApiTest, self).setUp()
        simon = Lecturer('Simon', 'McCallum')
        db.session.add(simon)

        imt3601 = Course('IMT3601 - Game Programming', simon)
        db.session.add(imt3601)

        imt3601_l1 = Lecture('Lecture 1', imt3601)
        db.session.add(imt3601_l1)

        comment = Comment('This is boring', datetime.utcnow(), imt3601_l1)
        db.session.add(comment)

        db.session.commit()

        self.lecture = imt3601_l1

        # Using the POST API is required to make server use the correct
        # client_id. See API doc for info about the client_id Cookie.
        self.client.post('/api/0/lectures/1/comments/1/rating', data=dict(
            rating=1
        ))

    def test_success(self):
        rv = self.client.get('/api/0/lectures/1/comments/1/rating')
        assert rv.status_code == 200

    def test_lecture_not_found(self):
        rv = self.client.get('/api/0/lectures/2/comments/1/rating')
        assert rv.status_code == 404

    def test_comment_not_found(self):
        rv = self.client.get('/api/0/lectures/1/comments/2/rating')
        assert rv.status_code == 404

    def test_content(self):
        rv = self.client.get('/api/0/lectures/1/comments/1/rating')
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))
        assert 'rating' in response
        assert response['rating'] == 1

    def test_default_value(self):
        comment = Comment('Awesome', datetime.utcnow(), self.lecture)
        db.session.add(comment)

        rv = self.client.get('/api/0/lectures/1/comments/2/rating')
        assert rv.headers['Content-Type'] == 'application/json'

        response = json.loads(rv.data.decode('utf-8'))
        assert 'rating' in response
        assert response['rating'] == 0
