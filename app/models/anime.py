from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Anime(db.Model):
    __tablename__ = 'anime'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    synopsis = db.Column(db.String(255), nullable=False)
    episodeNum = db.Column(db.Integer, nullable=False)
    hostEditorId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False
    )
    previewImage = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    user = db.relationship("User", back_populates="anime")


    def to_dict_basic(self):
        return {
            "id": self.id,
            "title": self.title,
            "synopsis": self.synopsis,
            "episodeNum": self.episodeNum,
        }
    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "Host Editor": self.user.to_dict_basic()
        }