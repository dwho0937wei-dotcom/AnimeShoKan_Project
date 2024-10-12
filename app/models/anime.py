from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Anime(db.Model):
    __tablename__ = 'anime'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    synopsis = db.Column(db.String(255), nullable=False)
    numOfEpisode = db.Column(db.Integer, nullable=False)
    hostEditorId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False
    )
    previewImage = db.Column(db.String, nullable=True)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    user = db.relationship("User", back_populates="anime")
    episodes = db.relationship("Episode", back_populates="anime", cascade="all, delete")


    def to_dict_catalog(self):
        return {
            "id": self.id,
            "title": self.title,
        }
    def to_dict_basic(self):
        return {
            **self.to_dict_catalog(),
            "synopsis": self.synopsis,
            "numOfEpisode": self.numOfEpisode,
            "previewImage": self.previewImage,
            "hostEditorId": self.hostEditorId,
        }
    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "Host Editor": self.user.to_dict_basic(),
            "Episodes": sorted([episode.to_dict_basic() for episode in self.episodes], key=lambda ep: ep.get('episodeNum')),
        }