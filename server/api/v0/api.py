from flask import Blueprint
from flask_restful import Api

from .auth import LoginResource, LogoutResource
from .resources import LectureResource, CommentListResource
from .resources import EngagementListResource, CommentRatingResource
from .course import CourseListResource
from .lecture import LectureListResource


api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(LoginResource, '/auth/login')
api.add_resource(LogoutResource, '/auth/logout')

api.add_resource(LectureResource, '/lectures/<lecture_id>')
api.add_resource(CommentListResource, '/lectures/<lecture_id>/comments')
api.add_resource(EngagementListResource, '/lectures/<lecture_id>/engagements')
api.add_resource(CommentRatingResource, '/lectures/<lecture_id>/comments/<comment_id>/rating')
api.add_resource(CourseListResource, '/courses')
api.add_resource(LectureListResource, '/lectures')
