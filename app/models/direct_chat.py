from .db import db

class DirectChat(db.Model):
    __tablename__ = 'direct_chats'
    __table_args__ = (db.UniqueConstraint('sender_id', 'recipient_id'),)

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    sender = db.relationship("User", back_populates='dm_sender', foreign_keys=[sender_id])
    recipient = db.relationship("User", back_populates='dm_recipient', foreign_keys=[recipient_id])
    messages = db.relationship('DirectMessage', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
        }
