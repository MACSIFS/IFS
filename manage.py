import os
import unittest
from datetime import datetime

from flask.ext.script import Manager

from server import create_app
from server.models import db
from server.models import Lecturer, Course, Lecture, Comment

manager = Manager(create_app)


@manager.command
def init_db():
    """ Initialize database: drop and create all columns """
    db.drop_all()
    db.create_all()


@manager.command
def mock_db():
    """ Insert mock data into database """
    init_db()

    simon = Lecturer('simon', '1234', 'Simon', 'McCallum')
    simon.admin = True
    db.session.add(simon)

    imt3601 = Course('IMT3601 - Game Programming', simon)
    db.session.add(imt3601)

    imt3601_l1 = Lecture('Lecture 1', imt3601)
    db.session.add(imt3601_l1)

    imt3601_l1_c1 = Comment('This is boring', datetime.utcnow(), imt3601_l1)
    db.session.add(imt3601_l1_c1)
    imt3601_l1_c2 = Comment('This is fun!', datetime.utcnow(), imt3601_l1)
    db.session.add(imt3601_l1_c2)

    db.session.commit()


@manager.command
def test():
    tests_path = os.path.join(os.path.dirname(__file__), 'server', 'tests')
    tests = unittest.defaultTestLoader.discover(tests_path)
    runner = unittest.TextTestRunner()
    runner.run(tests)

if __name__ == '__main__':
    manager.run()
