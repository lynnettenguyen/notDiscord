from app.models import db, Server

def seed_servers():
    demo_servers = [
      Server(
        owner_id=1, name='Ducks', server_pic='https://res.cloudinary.com/dv3qturtv/image/upload/v1661225905/server1.png'
      ),
      Server(
        owner_id=1, name='Advanced HTML Tips', server_pic='https://res.cloudinary.com/dv3qturtv/image/upload/v1661225841/server3.png'
        ),
      Server(
        owner_id=1, name='Ghibli Films', server_pic='https://res.cloudinary.com/dv3qturtv/image/upload/v1661225841/server4.png'
        ),
      Server(
        owner_id=1, name='Japan Trip', server_pic='https://res.cloudinary.com/dv3qturtv/image/upload/v1661227697/sushi3.png'
        ),
      Server(
        owner_id=1, name='Discord Squad', server_pic='https://res.cloudinary.com/dv3qturtv/image/upload/v1661225841/server5.png'
        ),
    ]

    for server in demo_servers:
      db.session.add(server)

    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
