from flask_restful import Resource, reqparse, abort
from flask.ext.login import current_user, login_required

from server.models import db, Course, Lecturer


class CourseListResource(Resource):
    def get(self):
        argparser = reqparse.RequestParser()
        argparser.add_argument('lecturer', location='args', type=int)
        args = argparser.parse_args()

        query = (
            db.session.query(
                Course.id,
                Course.name
            )
        )

        if args.lecturer is not None:
            query = query.filter(Course.lecturer_id == args.lecturer)

        return [
            {
                'id': row.id,
                'name': row.name
            }
            for row in query
        ]

    @login_required
    def post(self):
        argparser = reqparse.RequestParser()
        argparser.add_argument('name', required=True)
        argparser.add_argument('lecturerId', type=int, required=True)
        args = argparser.parse_args()

        if args.lecturerId != current_user.id:
            abort(403, message="lectureId must be the ID of the logged in lecturer")

        course = Course(args.name, current_user)
        db.session.add(course)
        db.session.flush()

        return {
            'id': course.id
        }
