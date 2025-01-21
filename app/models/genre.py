from .anime import Anime
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Genre(db.Model):
    __tablename__ = 'genres'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.today)
    updatedAt = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)


    anime = db.relationship("Anime", back_populates="genres", cascade="none")


    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name
        }
    # def to_dict_with_anime(self):
    #     animeList = sorted([])