from flask_restful import Resource, reqparse, abort
from flask.ext.login import current_user, login_required

from server.models import db, Course, Lecturer, Lecture


class LectureListResource(Resource):
    def get(self):
        argparser = reqparse.RequestParser()
        argparser.add_argument('course', location='args', type=int)
        args = argparser.parse_args()

        query = (
            db.session.query(
                Lecture.id,
                Lecture.name,
                Lecture.course_id
            )
        )

        if args.course is not None:
            query = query.filter(Lecture.course_id == args.course)
        
        query = query.order_by(Lecture.id)
        
        return [
            {
                'id': row.id,
                'name': row.name,
                'courseId': row.course_id
            }
            for row in query
        ]

    @login_required
    def post(self):
        argparser = reqparse.RequestParser()
        argparser.add_argument('name', required=True)
        argparser.add_argument('courseId', type=int, required=True)
        args = argparser.parse_args()
        
        query = Course.query.filter(Course.id == args.courseId)
        
        course = query.first() 
        
        if course is None:
            abort(400, message="Invalid course ID")   
        
        lecture = Lecture(args.name, course)
        db.session.add(lecture)
        db.session.flush()

        return {
            'id': lecture.id
        }
