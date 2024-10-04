from app.models import db, Anime, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_anime():
    marnie = User.query.get({"username": "marnie"})
    bobbie = User.query.get({"username": "bobbie"})

    stein_gate = Anime(
        title='Steins;Gate',
        synopsis='"Steins;Gate" follows the story of Rintarou Okabe, a self-proclaimed mad scientist who, along with his friends, discovers a method to send text messages to the past using a modified microwave. As they experiment with this newfound power, they inadvertently attract the attention of a mysterious organization and begin to face dire consequences. The series intricately weaves themes of time travel, friendship, and the impact of choices, leading to intense emotional moments and thought-provoking dilemmas. The blend of science fiction with rich character development makes "Steins;Gate" a critically acclaimed series in the anime community.',
        episodeNum=0,
        hostEditorId=marnie.id,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/3f34e37a281f4223805e1039ef2b49e1.png"
    )
    reincarnate_vending_machine = Anime(
        title='Reborn as a Vending Machine, I Now Wander the Dungeon',
        synopsis='The story follows a vending machine enthusiast who meets an ironic fate when he is crushed by a vending machine. Upon his death, he finds himself reincarnated as a vending machine in a fantasy world. As he navigates this new existence, he encounters various characters who interact with him, leading to humorous and adventurous situations. The anime blends elements of isekai (another world) with quirky comedy, exploring the unique challenges and experiences of being a vending machine in a dungeon setting.',
        episodeNum=0,
        hostEditorId=bobbie.id,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/24932268b9514a599e20698a92cf1b3d.png"
    )

    anime_list = [
        stein_gate,
        reincarnate_vending_machine
    ]

    for anime in anime_list:
        db.session.add(anime)
    db.session.commit()


def undo_anime():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.anime RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM anime"))
        
    db.session.commit()