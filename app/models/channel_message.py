from .db import db

class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    # server_default tells  SQLAlchemy to use default value when creating the table
    # server_onupdate will update the datetime when the column is updated
    # updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship("User", back_populates='channel_message')
    channel = db.relationship("Channel", back_populates='channel_message')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'content': self.content,
            'created_at': self.created_at
        }
