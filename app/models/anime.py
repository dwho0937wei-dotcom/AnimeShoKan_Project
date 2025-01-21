from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .join_tables import anime_character_table, anime_genres_table


class Anime(db.Model):
    __tablename__ = 'anime'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    synopsis = db.Column(db.Text, nullable=False)
    numOfEpisode = db.Column(db.Integer, nullable=False)
    hostEditorId = db.Column(
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False
    )
    previewImage = db.Column(db.String, nullable=True)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    characters = db.relationship("Character", back_populates="anime", secondary=anime_character_table, cascade="none")
    episodes = db.relationship("Episode", back_populates="anime", cascade="all, delete")
    genres = db.relationship("Genre", back_populates="anime", secondary=anime_genres_table, cascade="none")
    user = db.relationship("User", back_populates="anime")


    def to_dict_catalog(self):
        return {
            "id": self.id,
            "title": self.title,
            "previewImage": self.previewImage,
        }
    def to_dict_basic(self):
        return {
            **self.to_dict_catalog(),
            "hostEditorId": self.hostEditorId,
            "numOfEpisode": self.numOfEpisode,
            "synopsis": self.synopsis,
        }
    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "Characters": sorted([character.to_dict_basic() for character in self.characters], key=lambda char: char.get('fullName')),
            "Episodes": sorted([episode.to_dict_basic() for episode in self.episodes], key=lambda ep: ep.get('episodeNum')),
            "Host Editor": self.user.to_dict_basic(),
        }