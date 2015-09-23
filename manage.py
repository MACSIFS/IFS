from flask.ext.script import Manager

from ifs import app
from ifs.models import db

manager = Manager(app)


@manager.command
def init_db():
    """ Initialize database: drop and create all columns """
    db.drop_all()
    db.create_all()


if __name__ == "__main__":
    manager.run()
