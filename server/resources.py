from datetime import datetime

import dateutil.parser

from flask import g
from flask_restful import Resource, Api, abort, reqparse
from sqlalchemy import and_

from .models import db, Comment, Lecture, Engagement, CommentRating

api = Api()


class LectureResource(Resource):
    def get(self, lecture_id):
        db_lectures = Lecture.query.filter(Lecture.id == lecture_id).all()

        if not db_lectures:
            abort(404, message="Lecture {} does not exist".format(lecture_id))

        lecture = db_lectures[0]
        return {
            'id': lecture.id,
            'name': lecture.name,
            'courseId': lecture.course_id
        }


class CommentListResource(Resource):
    def get(self, lecture_id):
        db_lecture = Lecture.query.filter(Lecture.id == lecture_id).first()

        if not db_lecture:
            abort(404, message="Lecture {} does not exist".format(lecture_id))

        rows = (
            db.session.query(
                Comment.id,
                Comment.content,
                Comment.submissiontime,
                CommentRating.rating
            )
            .outerjoin(
                CommentRating,
                and_(
                    CommentRating.comment_id == Comment.id,
                    CommentRating.user_id == g.client_id
                )
            )
            .filter(Comment.lecture_id == lecture_id)
            .all()
        )

        comments = [
            {
                'id': row.id,
                'content': row.content,
                'submissionTime': row.submissiontime.isoformat(),
                'rating': row.rating or 0
            }
            for row in rows
        ]

        return {
            'comments': comments
        }

    def post(self, lecture_id):
        lecture = Lecture.query.filter(Lecture.id == lecture_id).first()

        if not lecture:
            abort(404, message="Lecture {} does not exist".format(lecture_id))

        parser = reqparse.RequestParser()
        parser.add_argument('data', help="Text content of comment")
        args = parser.parse_args()

        if not args.data:
            abort(400, message="Comment has no data parameter")

        content = args.data

        comment = Comment(content, datetime.utcnow(), lecture)
        db.session.add(comment)
        db.session.commit()

        return {
            'id': comment.id
        }


class EngagementListResource(Resource):
    def get(self, lecture_id):
        parser = reqparse.RequestParser()
        parser.add_argument('last', location='args', type=bool)
        args = parser.parse_args()

        lecture = Lecture.query.filter(Lecture.id == lecture_id).first()

        if not lecture:
            abort(404, message="Lecture {} does not exist".format(lecture_id))

        if args.last:
            query = (
                db.session.query(
                    Engagement.id,
                    Engagement.user_id,
                    Engagement.interest,
                    Engagement.challenge,
                    Engagement.time
                )
                .filter(Engagement.lecture_id == lecture_id)
                .order_by(Engagement.time)
                .group_by(Engagement.user_id)
            )
        else:
            query = (
                db.session.query(Engagement)
                .filter(Engagement.lecture_id == lecture_id)
            )

        rows = query.all()

        engagements = [
            {
                'id': row.id,
                'userID': row.user_id,
                'challenge': row.challenge,
                'interest': row.interest,
                'time': row.time.isoformat()
            }
            for row in rows
        ]

        return engagements

    def post(self, lecture_id):
        lecture = Lecture.query.filter(Lecture.id == lecture_id).first()

        if not lecture:
            abort(404, message="Lecture {} does not exist".format(lecture_id))

        parser = reqparse.RequestParser()
        parser.add_argument('challenge', required=True, type=float)
        parser.add_argument('interest', required=True, type=float)
        parser.add_argument('time', required=True, type=str)
        args = parser.parse_args()

        challenge = args.challenge
        interest = args.interest

        if not (0.0 <= challenge <= 1.0):
            abort(400, message="Challenge must be in range [0,1]")

        if not (0.0 <= interest <= 1.0):
            abort(400, message="Interest must be in range [0,1]")

        try:
            time = dateutil.parser.parse(args.time)
        except ValueError as e:
            abort(400, message="Time could not be parsed: {}".format(e))

        user_id = g.client_id

        engagement = Engagement(challenge, interest, time, user_id, lecture)
        db.session.add(engagement)
        db.session.commit()

        return {
            'id': engagement.id
        }


class CommentRatingResource(Resource):
    def get(self, lecture_id, comment_id):
        lecture = Lecture.query.filter(Lecture.id == lecture_id).first()

        if not lecture:
            abort(404, message="Lecture {} does not exist".format(lecture_id))

        comment = Comment.query.filter(Comment.id == comment_id).first()

        if not comment:
            abort(404, message="Comment {} does not exist".format(comment_id))

        user_id = g.client_id

        comment_rating = CommentRating.query.filter(
            CommentRating.lecture_id == lecture.id,
            CommentRating.comment_id == comment.id,
            CommentRating.user_id == user_id
        ).first()

        rating = 0

        if comment_rating:
            rating = comment_rating.rating

        return {
            'rating': rating
        }

    def post(self, lecture_id, comment_id):
        lecture = Lecture.query.filter(Lecture.id == lecture_id).first()

        if not lecture:
            abort(404, message="Lecture {} does not exist".format(lecture_id))

        comment = Comment.query.filter(Comment.id == comment_id).first()

        if not comment:
            abort(404, message="Comment {} does not exist".format(comment_id))

        parser = reqparse.RequestParser()
        parser.add_argument('rating', required=True, type=int)
        args = parser.parse_args()

        rating = args.rating

        if rating is None:
            abort(400, message="Comment has no rating parameter")

        if not isinstance(rating, int):
            abort(400, message="Comment rating must be an integer")

        if rating not in {-1, 0, 1}:
            abort(400, message="Comment rating must be -1, 0 or 1")

        user_id = g.client_id

        with db.session.begin(subtransactions=True):
            comment_rating = CommentRating.query.filter(
                CommentRating.lecture_id == lecture.id,
                CommentRating.comment_id == comment.id,
                CommentRating.user_id == user_id
            ).first()

            if comment_rating:
                comment_rating.rating = rating
            else:
                comment_rating = CommentRating(rating, user_id, comment, lecture)
                db.session.add(comment_rating)

        return None


api.add_resource(LectureResource, '/api/0/lectures/<lecture_id>')
api.add_resource(CommentListResource, '/api/0/lectures/<lecture_id>/comments')
api.add_resource(EngagementListResource, '/api/0/lectures/<lecture_id>/engagements')
api.add_resource(CommentRatingResource, '/api/0/lectures/<lecture_id>/comments/<comment_id>/rating')
