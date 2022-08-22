from app.models import db, Channel

def seed_channels():
    demo_channels = [
      Channel(
        server_id=1, name='general', topic='For people who like ducks'
      ),
      Channel(
        server_id=2, name='general', topic='Let\'s go to Japan!'
        ),
      Channel(
        server_id=3, name='general', topic='<h1> Hello Programmers </h1>'
        ),
      Channel(
        server_id=4, name='general', topic='Share all things Ghibli!'
        ),
      Channel(
        server_id=5, name='general', topic='Join our Discord family!'
        ),
    ]

    for channel in demo_channels:
      db.session.add(channel)

    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
