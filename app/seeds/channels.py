from app.models import db, Channel


def seed_channels():
    demo_channels = [
      Channel(
        server_id=1, name='general', topic='For people who like ducks'
      ),
      Channel(
        server_id=1, name='duck-facts', topic='Things every duck owner should know'
      ),
      Channel(
        server_id=1, name='duck-jokes', topic='Please quack some jokes'
      ),
      Channel(
        server_id=4, name='general', topic='Let\'s go to Japan!'
        ),
      Channel(
        server_id=4, name='places-to-visit', topic='Recommend places to visit in Japan'
        ),
      Channel(
        server_id=4, name='must-try-foods', topic='Restaurants we must try in Japan'
        ),
      Channel(
        server_id=2, name='general', topic='<h1> Hello Programmers </h1>'
        ),
      Channel(
        server_id=2, name='coding-help', topic='Stuck? Ask for help!'
        ),
      Channel(
        server_id=2, name='css-resources', topic='Share resources that helped you!'
        ),
      Channel(
        server_id=3, name='general', topic='Share all things Ghibli!'
        ),
      Channel(
        server_id=3, name='soundtrack', topic='Share soundtrack favorites from the films'
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
