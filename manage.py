import os
import unittest

from flask.ext.script import Manager

from server import app
from server.models import db

manager = Manager(app)


@manager.command
def init_db():
    """ Initialize database: drop and create all columns """
    db.drop_all()
    db.create_all()


@manager.command
def test():
    tests_path = os.path.join(os.path.dirname(__file__), 'server', 'tests')
    tests = unittest.defaultTestLoader.discover(tests_path)
    runner = unittest.TextTestRunner()
    runner.run(tests)

if __name__ == '__main__':
    manager.run()
