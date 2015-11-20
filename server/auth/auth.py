import json

from flask import Blueprint, request, abort
from flask.ext.login import current_user, logout_user, login_user

from server.models import Lecturer, db

from .util import hash_password

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        if current_user.is_active:
            return json.dumps({'name': current_user.full_name})
        else:
            abort(401)
    else:
        user_name = request.form['user_name']
        password = request.form['password']
        user = (
            db.session.query(Lecturer)
            .filter(Lecturer.user_name == user_name)
            .filter(Lecturer.password == hash_password(password))
            .first()
        )
        if not user:
            abort(401)
        login_user(user)
        return 'ok'


@auth.route('/logout')
def logout():
    logout_user()
    return 'ok'
