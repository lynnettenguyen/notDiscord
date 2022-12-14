from flask.cli import AppGroup

from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels
from .direct_chats import seed_direct_chats, undo_direct_chats


# creates a seed group to hold our commands so we can type `flask seed --help`
seed_commands = AppGroup('seed')


# creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_servers()
    seed_channels()
    seed_direct_chats()


# creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
    undo_channels()
    undo_direct_chats()
