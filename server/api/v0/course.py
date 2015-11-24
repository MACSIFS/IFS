from flask_restful import Resource, reqparse

from server.models import db, Course


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
