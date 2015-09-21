from flask import Blueprint

main = Blueprint('main', __name__, template_folder='templates',
                 static_folder='static')


@main.route('/')
def main_page():
    return 'Hello world'
