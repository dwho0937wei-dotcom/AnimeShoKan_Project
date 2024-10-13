from app.models import db, Episode, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_episodes():
    steinGateEp1 = Episode(
        title='''Turning Point''',
        plot='''Okabe Rintaro and his friend Mayuri attend a conference. Okabe discovers a bloodied Makise Kurisu but, in a panic, sends a message about her death. He then experiences a bizarre phenomenon where time seems to shift, leading him to question reality.''',
        episodeNum=1,
        airDate=datetime(2011, 4, 5),
        previewImage='http://animeshokanbucket.s3.amazonaws.com/f123aed01a67467fbdda8cf29b2d0a73.png',
        animeId=9
    )

    episode_list = [
        steinGateEp1,
    ]

    for episode in episode_list:
        db.session.add(episode)
    db.session.commit()


def undo_episodes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.episodes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM episodes"))
        
    db.session.commit()     