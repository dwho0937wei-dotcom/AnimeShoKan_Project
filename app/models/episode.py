from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Episode(db.Model):
    __tablename__ = 'episodes'

    if environment == 'production':
        __table_args__ = (
            db.UniqueConstraint('episodeNum', 'animeId', name='unique_anime_episode_number'),
            {'schema': SCHEMA}
        )

    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    plot = db.Column(db.String(255), nullable=False)
    episodeNum = db.Column(db.Integer, nullable=False)
    airDate = db.Column(db.Date, nullable=False)
    previewImage = db.Column(db.String, nullable=True)
    animeId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("anime.id")), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    anime = db.relationship("Anime", back_populates="episodes")


    def to_dict_basic(self):
        return {
            "id": self.id,
            "title": self.title,
            "plot": self.plot,
            "episodeNum": self.episodeNum,
            "airDate": self.airDate,
            "previewImage": self.previewImage,
            "animeId": self.animeId,
        }
    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "Anime": self.anime.to_dict_basic(),
        }