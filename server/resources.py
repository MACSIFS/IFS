from flask_restful import Resource, Api, abort
from .models import Comment, Lecture

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


api.add_resource(CommentListResource, '/api/0/lectures/<lecture_id>/comments')
