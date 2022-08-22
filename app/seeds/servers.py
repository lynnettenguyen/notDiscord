from app.models import db, Server

def seed_servers():
    demo_servers = [
      Server(
        owner_id=1, name='Ducks', server_pic='https://res.cloudinary.com/dv3qturtv/image/upload/v1661116419/ducks.png'
      ),
      Server(
        owner_id=2, name='Travel Guide', server_pic='https://res.cloudinary.com/dv3qturtv/image/upload/v1661116639/travel_icon.png'
        ),
      Server(
        owner_id=3, name='Advanced HTML Tips', server_pic='https://res.cloudinary.com/dv3qturtv/image/upload/v1661116063/html.png'
        ),
      Server(
        owner_id=4, name='Ghibli Films', server_pic='https://res.cloudinary.com/dv3qturtv/image/upload/v1661116713/ghibli.png'
        ),
      Server(
        owner_id=5, name='Discord Squad', server_pic='https://res.cloudinary.com/dv3qturtv/image/upload/v1661117086/discord.png'
        ),
    ]

    for server in demo_servers:
      db.session.add(server)

    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
