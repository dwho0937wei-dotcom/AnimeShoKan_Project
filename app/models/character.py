from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .join_tables import anime_character_table


class Character(db.Model):
    __tablename__ = 'characters'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(255), nullable=False)
    introduction = db.Column(db.Text, nullable=False)
    appearance = db.Column(db.Text, nullable=False)
    personality = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    anime = db.relationship("Anime", back_populates="characters", secondary=anime_character_table, cascade="all, delete")


    def to_dict_basic(self):
        return {
            "fullName": self.fullName,
            "introduction": self.introduction,
            "appearance": self.appearance,
            "personality": self.personality,
        }
    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "Anime": sorted([oneAnime.to_dict_catalog() for oneAnime in self.anime], key=lambda ani: ani.get('title'))
        }