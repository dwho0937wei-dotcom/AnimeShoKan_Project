from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .join_tables import anime_character_table
from .anime import Anime
from sqlalchemy import select
from sqlalchemy.orm import aliased


class Character(db.Model):
    __tablename__ = 'characters'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(255), nullable=False)
    introduction = db.Column(db.Text, nullable=False)
    appearance = db.Column(db.Text, nullable=False)
    personality = db.Column(db.Text, nullable=False)
    previewImage = db.Column(db.String, nullable=True)
    hostEditorId = db.Column(
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False,
    )
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    anime = db.relationship("Anime", back_populates="characters", secondary=anime_character_table, cascade="all, delete")
    user = db.relationship("User", back_populates="characters")


    def to_dict_catalog(self):
        return {
            "id": self.id,
            "fullName": self.fullName,
        }
    def to_dict_basic(self):
        return {
            **self.to_dict_catalog(),
            "introduction": self.introduction,
            "appearance": self.appearance,
            "personality": self.personality,
            "previewImage": self.previewImage,
            "hostEditorId": self.hostEditorId,
        }
    def to_dict(self):
        ac = aliased(anime_character_table)
        anime_data = db.session.execute(
            select(Anime, ac.c.characterType)
            .join(ac, Anime.id == ac.c.animeId)
            .where(ac.c.characterId == self.id)
        ).all()
        animeList = sorted([
            {**oneAnime.to_dict_catalog(), "characterType": characterType} for oneAnime, characterType in anime_data
        ], key=lambda ani: ani.get('title'))
        print("animeList:", animeList)

        return {
            **self.to_dict_basic(),
            "Anime": animeList,
            "Host Editor": self.user.to_dict_basic(),
        }