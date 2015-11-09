from flask import request
from flask_restful import Resource, Api, abort, reqparse
from .models import db, Comment, Lecture

api = Api()


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

api.add_resource(CommentListResource, '/api/0/lectures/<lecture_id>/comments')
