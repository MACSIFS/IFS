import json

from flask import Blueprint, request, abort
from flask.ext.login import current_user, logout_user, login_user

from server.models import Lecturer, db


auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        if current_user.is_active:
            return json.dumps({'name': current_user.full_name})
        else:
            abort(403, "The user is not logged in")
    else:
        email = request.form['email']
        password = request.form['password']
        user = (
            db.session.query(Lecturer)
            .filter(Lecturer.email == email)
            .filter(Lecturer.password == password)
            .first()
        )
        if not user:
            abort(403, "Invalid credentials")
        login_user(user)
        return json.dumps({'name': current_user.full_name})


@auth.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return '', 204
