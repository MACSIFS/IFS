from _sha256 import sha256

from flask import current_app


def hash_password(password):
    return (
        sha256(password.encode() + current_app.config['SECRET_KEY'].encode())
        .hexdigest()
    )
