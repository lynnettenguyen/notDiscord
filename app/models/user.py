from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    # first_name = db.Column(db.String(40))
    # last_name = db.Column(db.String(40))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255))

    servers = db.relationship('Server', back_populates='user')
    channel_messages_sent = db.relationship('ChannelMessage', back_populates='user')
    dm_sender = db.relationship('DirectChat', back_populates='sender', foreign_keys='DirectChat.sender_id')
    dm_recipient = db.relationship('DirectChat', back_populates='recipient', foreign_keys='DirectChat.recipient_id')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            # 'first_name': self.first_name,
            # 'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic
        }
