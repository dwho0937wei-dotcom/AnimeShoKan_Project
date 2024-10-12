from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo', lastName='User', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        firstName='Marnie', lastName='Academy', username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        firstName='Bobby', lastName='Academy', username='bobbie', email='bobbie@aa.io', password='password')
    emma = User(
        firstName='Emma', lastName='Johnson', username='emma_j123', email='emma.johnson@example.com', password='password')
    liam = User(
        firstName='Liam', lastName='Smith', username='liam_smith89', email='liam.smith@example.com', password='password')
    ava = User(
        firstName='Ava', lastName='Martinez', username='ava_martinez22', email='ava.martinez@example.com', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(emma)
    db.session.add(liam)
    db.session.add(ava)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
