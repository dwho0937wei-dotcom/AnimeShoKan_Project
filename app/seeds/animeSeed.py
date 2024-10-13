from app.models import db, Anime, environment, SCHEMA
from sqlalchemy.sql import text


def seed_anime():
    berserk = Anime(
        title='''Berserk (Please Do NOT Delete)''',
        synopsis='''Guts, a lone mercenary, joins Griffith's Band of the Hawk. After betrayal leads to horrific sacrifices, Guts seeks vengeance against Griffith and the demonic Apostles in a dark fantasy world filled with violence and despair.''',
        numOfEpisode=0,
        hostEditorId=1,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/8f4cdde1e4134597bf48e5603495a808.jpg"
    )
    codeBreaker = Anime(
        title='''C0DE:BREAKER (Please Do NOT Delete)''',
        synopsis='''Sakura witnesses Rei, a "Code:Breaker," use blue flames to execute criminals. Torn between justice and morality, she tries to stop him while uncovering the secrets of other Code:Breakers, leading to conflicts over their lethal methods and ideals.''',
        numOfEpisode=0,
        hostEditorId=2,
        previewImage="https://animeshokanbucket.s3.us-east-2.amazonaws.com/2a9477ceb71f41918a39ed558fe75d87.png"
    )
    controlTheMoneySoulPossibility = Anime(
        title='''Control: The Money and Soul of Possibility (Please Do NOT Delete)''',
        synopsis='''In a financially struggling Japan, college student Kimimaro enters the mysterious Financial District, where people bet their futures in high-stakes "Deals." With his Asset Msyu, he faces moral dilemmas and economic battles that could reshape reality.''',
        numOfEpisode=0,
        hostEditorId=3,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/d08aa6cffdaa46eabeeb23aee9219cdf.png"
    )
    danganronpa = Anime(
        title='''Danganronpa: The Animation (Please Do NOT Delete)''',
        synopsis='''Danganronpa: The Animation follows 15 students trapped in a school by Monokuma. To escape, they must kill without detection. Protagonist Makoto Naegi faces deadly trials, uncovers secrets, and battles despair in this twisted game of survival.''',
        numOfEpisode=0,
        hostEditorId=4,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/e50adfae8c52446aa6d0129a7f376f14.png"
    )
    dGrayMan = Anime(
        title='''D.Gray-Man (Please Do NOT Delete)''',
        synopsis='''In D.Gray-man, exorcist Allen Walker joins the Black Order to fight the Millennium Earl and his Akuma. Armed with "Innocence," he battles dark forces while uncovering secrets about his past and the fate of humanity in a struggle against evil.''',
        numOfEpisode=0,
        hostEditorId=5,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/7d936c0a586a4510948c2d5eb7026adb.png"
    )
    fruitsBasket = Anime(
        title='''Fruits Basket (Please Do NOT Delete)''',
        synopsis='''Orphan Tohru Honda discovers the Sohma family's secret: they transform into zodiac animals when hugged by the opposite sex. Living with them, she helps heal their emotional wounds while uncovering the curse's nature and forming bonds that could break it.''',
        numOfEpisode=0,
        hostEditorId=6,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/ec3f698531a24d80b41db5e8fc2ccbca.png"
    )
    reincarnateVendingMachine = Anime(
        title='''Reborn as a Vending Machine, I Now Wander the Dungeon (Please Do NOT Delete)''',
        synopsis='''After dying, a vending machine otaku is reborn as a vending machine in a fantasy world. He meets Lammis, a girl who carries him through dungeons, where they face challenges and help others while he dispenses items and adapts to his new life.''',
        numOfEpisode=0,
        hostEditorId=1,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/24932268b9514a599e20698a92cf1b3d.png"
    )
    rezero = Anime(
        title='''Re:Zero - Starting Life in Another World (Please Do NOT Delete)''',
        synopsis='''Subaru Natsuki is transported to a fantasy world, gaining the ability to reset time upon death. He aids half-elf Emilia in her royal candidacy, facing deadly challenges and mental trauma while uncovering the world's mysteries and his purpose.''',
        numOfEpisode=0,
        hostEditorId=2,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/b473c7a9a6f54f8bb67128ed5c7e3cfe.png"
    )
    steinGate = Anime(
        title='''Steins;Gate (Please Do NOT Delete)''',
        synopsis='''Okabe Rintaro, a self-proclaimed mad scientist, discovers time travel with a microwave. He and his friends send messages to the past, leading to dangerous consequences. Okabe must navigate timelines to save his friends and avert a dark future.''',
        numOfEpisode=1,
        hostEditorId=3,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/3f34e37a281f4223805e1039ef2b49e1.png"
    )

    anime_list = [
        berserk,
        codeBreaker,
        controlTheMoneySoulPossibility,
        danganronpa,
        dGrayMan,
        fruitsBasket,
        reincarnateVendingMachine,
        rezero,
        steinGate,
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