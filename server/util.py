import logging
from functools import wraps

from webob.exc import HTTPRedirection

from server.models import db

log = logging.getLogger(__name__)


def transactional(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            db.session.begin()
            result = func(*args, **kwargs)
            db.session.commit()
            return result
        except HTTPRedirection as e:
            db.session.commit()
            raise
        except Exception as e:
            try:
                db.session.rollback()
            except Exception as eroll:
                log.exception(eroll)
            raise e

    return wrapper
