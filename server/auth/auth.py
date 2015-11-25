import json

from flask import Blueprint, request
from flask.ext.login import current_user, logout_user, login_user
from flask.ext.restful import Api, Resource, abort, reqparse

from server.models import Lecturer, db


auth = Blueprint('auth', __name__)
api = Api(auth)


class LoginResource(Resource):
    def get(self):
        if current_user.is_active:
            return {'username': current_user.full_name}
        else:
            abort(403, message="The user is not logged in")

    def post(self):
        argparser = reqparse.RequestParser()
        argparser.add_argument('email', required=True)
        argparser.add_argument('password', required=True)
        args = argparser.parse_args()

        email = args.email
        password = args.password
        user = (
            db.session.query(Lecturer)
            .filter(Lecturer.email == email)
            .filter(Lecturer.password == password)
            .first()
        )
        if not user:
            abort(403, message="Invalid credentials")
        login_user(user)
        return {'username': current_user.full_name}


class LogoutResource(Resource):
    def post(self):
        logout_user()
        return '', 204

api.add_resource(LoginResource, '/login')
api.add_resource(LogoutResource, '/logout')
