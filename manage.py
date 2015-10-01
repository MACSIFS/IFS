from flask.ext.script import Manager

from server import app
from server.models import db

manager = Manager(app)


@manager.command
def init_db():
    """ Initialize database: drop and create all columns """
    db.drop_all()
    db.create_all()


if __name__ == "__main__":
    manager.run()
