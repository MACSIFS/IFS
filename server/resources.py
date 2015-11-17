import dateutil.parser
from flask_restful import Resource, Api, abort, reqparse
from .models import db, Comment, Lecture, Engagement

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

        db_comments = Comment.query.filter(Comment.lecture_id == lecture_id)

        comments = [
            {'id': c.id, 'content': c.content}
            for c in db_comments
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

        comment = Comment(content, lecture)
        db.session.add(comment)
        db.session.commit()

        return {
            'id': comment.id
        }


class EngagementListResource(Resource):
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

        engagement = Engagement(challenge, interest, time, lecture)
        db.session.add(engagement)
        db.session.commit()

        return {
            'id': engagement.id
        }


api.add_resource(LectureResource, '/api/0/lectures/<lecture_id>')
api.add_resource(CommentListResource, '/api/0/lectures/<lecture_id>/comments')
api.add_resource(EngagementListResource, '/api/0/lectures/<lecture_id>/engagements')
