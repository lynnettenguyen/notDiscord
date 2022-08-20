from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    name = db.Column(db.String(255))
    topic = db.Column(db.String(255))
    channel_pic = db.Column(db.String(255))

    server = db.relationship("Server", back_populates='channel')

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'name': self.name,
            'topic': self.topic,
            'channel_pic': self.channel_pic
        }
