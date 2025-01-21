from .anime import Anime
from datetime import datetime
from .db import db, environment, SCHEMA
from .join_tables import anime_genres_table


class Genre(db.Model):
    __tablename__ = 'genres'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.today)
    updatedAt = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)


    anime = db.relationship("Anime", back_populates="genres", secondary=anime_genres_table, cascade="none")


    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name
        }
    def to_dict_with_anime(self):
        return {
            **self.to_dict_basic(),
            "Anime": sorted([oneAnime.to_dict_basic() for oneAnime in self.anime], key=lambda oneAnime: oneAnime.get('title'))
        }