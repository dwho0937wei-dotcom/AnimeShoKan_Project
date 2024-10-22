from app.models import db, Character, environment, SCHEMA
from app.models.join_tables import anime_character_table
from sqlalchemy.sql import text


def seed_characters():
    # Steins;Gate (animeId = 9)
    rintaroOkabe = Character(
        fullName='''Rintaro Okabe''',
        introduction='''He, often going by the pseudonym Hououin Kyouma, is the 18-year-old protagonist and self-proclaimed "mad scientist." He is the founder of the Future Gadget Laboratory in Akihabara''',
        appearance='''Okabe is tall and slender with black hair and gray eyes. He is frequently seen wearing a lab coat over his clothes.''',
        personality='''Eccentric and dramatic, Okabe often engages in grandiose speeches and paranoid rants about a shadowy "Organization." Despite his odd behavior, he is deeply caring towards his friends and becomes more serious when faced with dire situations.''',
    )
    kurisuMakise = Character(
        fullName='''Kurisu Makise''',
        introduction='''She is a 18-year-old neuroscience researcher and the second main character of the series. She is incredibly intelligent, having skipped a grade in the American school system''',
        appearance='''She has long reddish-brown hair and blue eyes. She typically wears a white dress shirt under a tan jacket and a short black skirt.''',
        personality='''Brilliant and logical, Kurisu often serves as the voice of reason in the group. She exhibits mild tsundere traits, being initially cold but gradually warming up to others, especially Okabe.''',
    )
    mayuriShiina = Character(
        fullName='''Mayuri Shiina''',
        introduction='''She, often called "Mayushii," is Okabe's childhood friend and a part-time worker at a maid café. She is the first official lab member after Okabe''',
        appearance='''She has short black hair and large blue eyes. She often wears a light blue dress with a white collar and a matching hat.''',
        personality='''Cheerful and innocent, Mayuri is known for her catchphrase "Tuturu~" and her love for cosplay. She is caring and supportive, often serving as an emotional anchor for Okabe.''',
    )
    itaruHashida = Character(
        fullName='''Itaru Hashida''',
        introduction='''Commonly known as "Daru," he is Okabe's best friend and a skilled hacker. He is a fellow founder of the Future Gadget Laboratory''',
        appearance='''He is overweight with short brown hair and glasses. He typically wears a green t-shirt and cargo pants.''',
        personality='''Despite his otaku tendencies and frequent perverse comments, Daru is highly intelligent and loyal. His hacking skills prove invaluable to the team throughout the series.''',
    )
    suzuhaAmane = Character(
        fullName='''Suzuha Amane''',
        introduction='''She works part-time for Okabe's landlord and is searching for her father in Akihabara. She is later revealed to be a time traveler from the future''',
        appearance='''Suzuha has long brown hair often tied in a ponytail and brown eyes. She typically wears a black tank top and green shorts.''',
        personality='''Energetic and athletic, Suzuha initially appears carefree but harbors a serious mission. She is determined and loyal to her cause, showing great strength in the face of adversity.''',
    )
    yugoTennouji = Character(
        fullName='''Yugo Tennouji''',
        introduction='''Yugo Tennouji is the landlord of the Future Gadget Laboratory, where the main characters reside. He is a complex character who juggles his role as a gruff landlord with deeper ties to the series' overarching plot, particularly involving the organization SERN.''',
        appearance='''Yugo has a robust build, often depicted wearing casual clothing that reflects his working-class background. He has short black hair and a stern expression, which contributes to his intimidating presence.''',
        personality='''Initially portrayed as gruff and somewhat abrasive, Yugo's character reveals layers of complexity as the story unfolds. He is fiercely protective of his daughter, Nae, and shows a sense of responsibility towards the lab members. Despite his tough exterior, he possesses a caring side, especially when it comes to family and those he considers friends. His dual life as an agent for SERN adds intrigue and depth to his character, making him a pivotal figure in the narrative.''',
    )

    character_list = [
        rintaroOkabe,
        kurisuMakise,
        mayuriShiina,
        itaruHashida,
        suzuhaAmane,
        yugoTennouji
    ]
    for character in character_list:
        db.session.add(character)
    
    anime_character_associations = [
        (9, 1, "major"),
        (9, 2, "major"), 
        (9, 3, "major"),
        (9, 4, "supporting"),
        (9, 5, "supporting"),
        (9, 6, "minor")
    ]
    for animeId, characterId, characterType in anime_character_associations:
        db.session.execute(
            anime_character_table.insert().values(animeId=animeId, characterId=characterId, characterType=characterType)
        )
    
    db.session.commit()


def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM characters"))
        
    db.session.commit()