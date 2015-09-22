from flask import Flask

from .main.main import main

app = Flask(__name__)

app.register_blueprint(main)
