from .db import db

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'

    id = db.Column(db.Integer, primary_key=True)
    direct_chat_id = db.Column(db.Integer, db.ForeignKey('direct_chats.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    sender = db.relationship("User")
    direct_chat_messages = db.relationship("DirectChat", back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'direct_chat_id': self.direct_chat_id,
            'sender_id': self.sender_id,
            'content': self.content,
            'created_at': self.created_at
        }
