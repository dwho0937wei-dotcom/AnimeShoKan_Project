from app.models import db, Episode, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_episodes():
    steinGateEp1 = Episode(
        title='Turning Point',
        plot='In this episode, Rintaro Okabe, a self-proclaimed "mad scientist," attends a seminar on time travel in Akihabara. There, he meets Kurisu Makise, a neuroscience researcher. After a strange series of events, including finding Kurisu apparently dead, Okabe sends a text message about the incident to his friend Itaru "Daru" Hashida. However, he later discovers that Kurisu is alive and that his message arrived before he actually sent it. This leads to the revelation that the microwave oven they are developing can send messages back in time, setting off a chain of events that will alter their lives dramatically.',
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