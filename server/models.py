from flask.ext.sqlalchemy import SQLAlchemy


db = SQLAlchemy(session_options={'autocommit': True})


class Lecturer(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(254), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    active = db.Column(db.Boolean, default=True)

    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    courses = db.relationship('Course', backref='lecturer')

    def __init__(self, email, password, first_name, last_name):
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return "<Lecturer {}>".format(self.id)

    @property
    def full_name(self):
        if not self.first_name:
            return self.last_name
        return "%s %s" % (self.first_name, self.last_name)

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return self.active

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    lecturer_id = db.Column(db.Integer, db.ForeignKey('lecturer.id'), nullable=False)
    lectures = db.relationship('Lecture', backref='course')

    def __init__(self, name, lecturer):
        self.name = name
        self.lecturer = lecturer

    def __repr__(self):
        return "<Course {}>".format(self.id)


class Lecture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    quizzes = db.relationship('Quiz', backref='lecture')
    lectures = db.relationship('Comment', backref='lecture')
    engagements = db.relationship('Engagement', backref='lecture')
    comment_ratings = db.relationship('CommentRating', backref='lecture')

    def __init__(self, name, course):
        self.name = name
        self.course = course

    def __repr__(self):
        return "<Lecture {}>".format(self.id)


class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lecture_id = db.Column(db.Integer, db.ForeignKey('lecture.id'), nullable=False)
    question = db.Column(db.String(100), nullable=False)
    options = db.Column(db.String(100), nullable=False)

    def __init__(self, lecture, question, options):
        self.lecture = lecture
        self.question = question
        self.options = options

    def __repr__(self):
        return "<Quiz {}>".format(self.id)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    lecture_id = db.Column(db.Integer, db.ForeignKey('lecture.id'), nullable=False)
    submissiontime = db.Column(db.DateTime, nullable=False)
    comment_ratings = db.relationship('CommentRating', backref='comment')

    def __init__(self, content, submissiontime, lecture):
        self.content = content
        self.lecture = lecture
        self.submissiontime = submissiontime

    def __repr__(self):
        return "<Comment {}>".format(self.id)


class Engagement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    challenge = db.Column(db.Float, nullable=False)
    interest = db.Column(db.Float, nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.String(36), nullable=False)
    lecture_id = db.Column(db.Integer, db.ForeignKey('lecture.id'), nullable=False)

    def __init__(self, challenge, interest, time, user_id, lecture):
        self.challenge = challenge
        self.interest = interest
        self.time = time
        self.user_id = user_id
        self.lecture = lecture

    def __repr__(self):
        return "<Engagement {}>".format(self.id)


class CommentRating(db.Model):
    user_id = db.Column(db.String(36), primary_key=True)
    lecture_id = db.Column(db.Integer, db.ForeignKey('lecture.id'), primary_key=True)
    comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'), primary_key=True)
    rating = db.Column(db.Integer, nullable=False)

    def __init__(self, rating, user_id, comment, lecture):
        self.rating = rating
        self.user_id = user_id
        self.comment = comment
        self.lecture = lecture

    def __repr__(self):
        return "<CommentRating {} {} {}>".format(self.user_id, self.comment_id, self.lecture_id)
