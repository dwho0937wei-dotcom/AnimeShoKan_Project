from flask.cli import AppGroup
from .users import seed_users, undo_users
from .animeSeed import seed_anime, undo_anime
from .episodes import seed_episodes, undo_episodes
from .characters import seed_characters, undo_characters

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_characters()
        undo_episodes()
        undo_anime()
        undo_users()
    seed_users()
    seed_anime()
    seed_episodes()
    seed_characters()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_characters()
    undo_episodes()
    undo_anime()
    undo_users()
    # Add other undo functions here