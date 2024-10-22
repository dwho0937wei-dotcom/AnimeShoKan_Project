from .db import db, environment, SCHEMA, add_prefix_for_prod


anime_character_table = db.Table(
    "anime_characters",
    db.Column(
        "animeId",
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("anime.id")), 
        primary_key=True,
    ),
    db.Column(
        "characterId",
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("characters.id")), 
        primary_key=True,
    ),
    db.Column(
        "characterType",
        db.Enum('major', 'supporting', 'minor'), 
        nullable=False,
    )
)