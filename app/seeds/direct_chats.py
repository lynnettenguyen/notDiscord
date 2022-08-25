from app.models import db, DirectChat

def seed_direct_chats():
    direct_chats = [
      DirectChat(
        sender_id=1, recipient_id=8
      ),
      DirectChat(
        sender_id=1, recipient_id=21
        ),
      DirectChat(
        sender_id=1, recipient_id=6
        ),
      DirectChat(
        sender_id=1, recipient_id=23
        ),
      DirectChat(
        sender_id=21, recipient_id=2
        ),
      DirectChat(
        sender_id=21, recipient_id=8
        ),
      DirectChat(
        sender_id=21, recipient_id=12
        ),
      DirectChat(
        sender_id=21, recipient_id=16
        ),
      DirectChat(
        sender_id=8, recipient_id=20
        ),
      DirectChat(
        sender_id=8, recipient_id=19
        )
    ]

    for chat in direct_chats:
      db.session.add(chat)

    db.session.commit()

def undo_direct_chats():
    db.session.execute('TRUNCATE direct_chats RESTART IDENTITY CASCADE;')
    db.session.commit()
