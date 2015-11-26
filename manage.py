import os
import unittest
from datetime import datetime
from hashlib import sha256

from flask.ext.script import Manager

from server import create_app
from server.models import db
from server.models import Lecturer, Course, Lecture, Comment, CommentRating

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

    simon = Lecturer('simon@hig.no', sha256('1234'.encode('utf-8')).hexdigest(), 'Simon', 'McCallum')
    simon.admin = True
    db.session.add(simon)

    magnus = Lecturer('magnus@hig.no', sha256('12345'.encode('utf-8')).hexdigest(), 'Magnus', 'Vik')
    db.session.add(magnus)

    imt3601 = Course('IMT3601 - Game Programming', simon)
    db.session.add(imt3601)

    imt3601_l1 = Lecture('Lecture 1', imt3601)
    db.session.add(imt3601_l1)

    imt3601_l1_c1 = Comment('This is boring', datetime(2015, 11, 26, 10, 30), imt3601_l1)
    db.session.add(imt3601_l1_c1)
    imt3601_l1_c2 = Comment('This is fun!', datetime(2015, 11, 26, 10, 40), imt3601_l1)
    db.session.add(imt3601_l1_c2)
    imt3601_l1_c3 = Comment('Help?', datetime(2015, 11, 26, 10, 50), imt3601_l1)
    db.session.add(imt3601_l1_c3)
    imt3601_l1_c4 = Comment(
        'A bit longer comment for your convenience',
        datetime(2015, 11, 26, 10, 10),
        imt3601_l1)
    db.session.add(imt3601_l1_c4)

    imt3601_l1_r1 = CommentRating(1, 1, imt3601_l1_c1, imt3601_l1)
    db.session.add(imt3601_l1_r1)
    imt3601_l1_r2 = CommentRating(1, 2, imt3601_l1_c1, imt3601_l1)
    db.session.add(imt3601_l1_r2)
    imt3601_l1_r3 = CommentRating(1, 3, imt3601_l1_c1, imt3601_l1)
    db.session.add(imt3601_l1_r3)

    imt3601_l1_r4 = CommentRating(-1, 1, imt3601_l1_c3, imt3601_l1)
    db.session.add(imt3601_l1_r4)

    imt3601_l1_r5 = CommentRating(1, 1, imt3601_l1_c4, imt3601_l1)
    db.session.add(imt3601_l1_r5)


    db.session.commit()


@manager.command
def test():
    tests_path = os.path.join(os.path.dirname(__file__), 'server', 'tests')
    tests = unittest.defaultTestLoader.discover(tests_path)
    runner = unittest.TextTestRunner()
    runner.run(tests)

if __name__ == '__main__':
    manager.run()
