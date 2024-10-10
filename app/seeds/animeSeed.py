from app.models import db, Anime, environment, SCHEMA
from sqlalchemy.sql import text


def seed_anime():
    berserk = Anime(
        title='Berserk (Please Do NOT Delete)',
        synopsis='Set in a dark fantasy world reminiscent of medieval Europe, the story follows Guts, a lone mercenary known as the Black Swordsman, who wields a massive sword and battles both human and supernatural foes. After being betrayed by his best friend Griffith, the leader of the mercenary group Band of the Hawk, Guts embarks on a quest for revenge.',
        numOfEpisode=0,
        hostEditorId=1,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/8f4cdde1e4134597bf48e5603495a808.jpg"
    )
    codeBreaker = Anime(
        title='C0DE:BREAKER (Please Do NOT Delete)',
        synopsis='C0DE:BREAKER follows the story of Sakura Sakurakoji, a high school girl who witnesses a mysterious boy, Ogami Rei, using fire to eliminate a group of criminals in a brutal manner. Intrigued and disturbed, she learns that Ogami is part of a covert organization called the "Code:Breakers," individuals who possess supernatural powers and operate outside the law to uphold justice. As Sakura becomes more involved with Ogami and his fellow Code:Breakers, she grapples with the moral implications of their actions and the nature of justice itself. The series combines action, supernatural elements, and themes of morality, as Sakura tries to understand the fine line between good and evil while forging deep connections with the enigmatic members of the Code:Breakers.',
        numOfEpisode=0,
        hostEditorId=2,
        previewImage="https://animeshokanbucket.s3.us-east-2.amazonaws.com/2a9477ceb71f41918a39ed558fe75d87.png"
    )
    controlTheMoneySoulPossibility = Anime(
        title='''Control: The Money and Soul of Possibility (Please Do NOT Delete)',
        synopsis='Set in a near-future world where the economy is manipulated by a mysterious organization known as the "Financial District," C – Control follows the story of a young man named Kimimaro Yoga. After being approached by a strange figure, he is drawn into the Financial District, where individuals can gamble their futures for wealth and power. Here, he must confront the ethical dilemmas of using money as a means to achieve one's desires while battling other "Entrepreneurs" who are also vying for success. As Kimimaro navigates this high-stakes environment, he grapples with the implications of his choices on his life and those around him, exploring themes of ambition, morality, and the true value of wealth.''',
        numOfEpisode=0,
        hostEditorId=3,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/d08aa6cffdaa46eabeeb23aee9219cdf.png"
    )
    danganronpa = Anime(
        title='Danganronpa: The Animation (Please Do NOT Delete)',
        synopsis='''Danganronpa: The Animation is based on the popular visual novel series and follows a group of high school students who are trapped in a prestigious academy called Hope's Peak High School. Each student is exceptionally talented in their respective fields, but they soon discover that they are part of a twisted game orchestrated by a sadistic bear named Monokuma. To escape the school, they must participate in a deadly game where they must kill one of their classmates without being caught. The remaining students then engage in intense class trials to uncover the murderer among them. As the story unfolds, themes of trust, betrayal, and the struggle for survival emerge, leading to shocking revelations about the characters and their motivations. The series combines elements of mystery, psychological thriller, and dark humor, making it a gripping watch for fans of suspenseful storytelling.''',
        numOfEpisode=0,
        hostEditorId=4,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/e50adfae8c52446aa6d0129a7f376f14.png"
    )
    dGrayMan = Anime(
        title='D.Gray-Man (Please Do NOT Delete)',
        synopsis='D.Gray-man follows the story of Allen Walker, a young exorcist who possesses a unique ability to manipulate his left arm, which can transform into a weapon known as the Innocence. Set in a fictional 19th-century Europe, the series revolves around the battle between exorcists and Akuma, malevolent beings created by the villainous Millennium Earl. Allen joins the Black Order, an organization dedicated to fighting against these creatures and uncovering the mysteries surrounding them. As he journeys with his comrades, he faces numerous challenges, including powerful enemies and his own dark past, all while striving to protect humanity and find his place in a world filled with despair and hope. The series is known for its rich character development, intricate plotlines, and themes of friendship, sacrifice, and the struggle between good and evil.',
        numOfEpisode=0,
        hostEditorId=5,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/7d936c0a586a4510948c2d5eb7026adb.png"
    )
    fruitsBasket = Anime(
        title='Fruits Basket (Please Do NOT Delete)',
        synopsis='Fruits Basket follows the story of Tohru Honda, a high school girl who, after a family tragedy, finds herself living in a tent. Her life takes a dramatic turn when she encounters the mysterious Sohma family, who harbor a secret: they are cursed to transform into animals of the Chinese zodiac when hugged by someone of the opposite sex. As Tohru becomes more involved with the Sohmas, she learns about their struggles with the curse and their emotional scars. Through her kindness and determination, Tohru helps them confront their pasts and find healing. The series beautifully blends elements of romance, comedy, and drama while exploring themes of acceptance, family bonds, and personal growth.',
        numOfEpisode=0,
        hostEditorId=6,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/ec3f698531a24d80b41db5e8fc2ccbca.png"
    )
    reincarnateVendingMachine = Anime(
        title='Reborn as a Vending Machine, I Now Wander the Dungeon (Please Do NOT Delete)',
        synopsis='The story follows a vending machine enthusiast who meets an ironic fate when he is crushed by a vending machine. Upon his death, he finds himself reincarnated as a vending machine in a fantasy world. As he navigates this new existence, he encounters various characters who interact with him, leading to humorous and adventurous situations. The anime blends elements of isekai (another world) with quirky comedy, exploring the unique challenges and experiences of being a vending machine in a dungeon setting.',
        numOfEpisode=0,
        hostEditorId=1,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/24932268b9514a599e20698a92cf1b3d.png"
    )
    rezero = Anime(
        title='Re:Zero - Starting Life in Another World (Please Do NOT Delete)',
        synopsis='The story follows Subaru Natsuki, an ordinary high school student who is unexpectedly transported to a fantasy world while returning from a convenience store. He encounters a silver-haired half-elf named Emilia, who is embroiled in a dangerous political struggle as a candidate for the throne of the Kingdom of Lugunica. After attempting to help her, Subaru and Emilia are brutally killed, but Subaru discovers he possesses a unique ability called "Return by Death," which allows him to rewind time to a previous point upon his death. This power, however, comes with the burden of retaining memories of past timelines, while everyone else forgets what has happened. As Subaru navigates this new world filled with peril and intrigue, he strives to protect Emilia and his new friends, facing numerous challenges and emotional turmoil along the way.',
        numOfEpisode=0,
        hostEditorId=2,
        previewImage="http://animeshokanbucket.s3.amazonaws.com/b473c7a9a6f54f8bb67128ed5c7e3cfe.png"
    )
    steinGate = Anime(
        title='Steins;Gate (Please Do NOT Delete)',
        synopsis='"Steins;Gate" follows the story of Rintarou Okabe, a self-proclaimed mad scientist who, along with his friends, discovers a method to send text messages to the past using a modified microwave. As they experiment with this newfound power, they inadvertently attract the attention of a mysterious organization and begin to face dire consequences. The series intricately weaves themes of time travel, friendship, and the impact of choices, leading to intense emotional moments and thought-provoking dilemmas. The blend of science fiction with rich character development makes "Steins;Gate" a critically acclaimed series in the anime community.',
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