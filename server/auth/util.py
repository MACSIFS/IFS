from _sha1 import sha1

from flask import current_app


def hash_password(password):
    return sha1(password.encode() + current_app.config['SECRET_KEY'].encode()).hexdigest()
