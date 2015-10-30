from flask.ext.sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Lecturer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    courses = db.relationship('Course', backref='lecturer')

    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return "<Lecturer {}>".format(self.id)

    @property
    def full_name(self):
        if not self.first_name:
            return self.last_name
        return "%s %s" % (self.first_name, self.last_name)


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    lecturer_id = db.Column(db.Integer, db.ForeignKey('lecturer.id'), nullable=False)
    lectures = db.relationship('Lecture', backref='course')

    def __init__(self, name, lecturer):
        self.name = name
        self.lecturer = lecturer

    def __repr__(self):
        return "<Course {}>".format(self.id)


class Lecture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    quizzes = db.relationship('Quiz', backref='lecture')

    def __init__(self, name, course):
        self.name = name
        self.course = course

    def __repr__(self):
        return "<Lecture {}>".format(self.id)


class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lecture_id = db.Column(db.Integer, db.ForeignKey('lecture.id'), nullable=False)
    question = db.Column(db.String(), nullable=False)
    options = db.Column(db.String(), nullable=False)

    def __init__(self, lecture, question, options):
        self.lecture = lecture
        self.question = question
        self.options = options

    def __repr__(self):
        return "<Quiz {}>".format(self.id)
