from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo User', email='demo@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_blue.png')
    alexZ = User(
        username='Alex Z', email='alexZ@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_green.png')
    benD = User(
        username='Ben D', email='benD@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_blue.png')
    antonyP = User(
        username='Antony P', email='antonyP@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_dark_pink.png')
    allanY = User(
        username='Allan Y', email='allanY@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_purple.png')
    attiyaK = User(
        username='Attiya K', email='attiyaK@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_pink.png')
    brianA = User(
        username='Brian A', email='brianA@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_red.png')
    calvinL = User(
        username='Calvin L', email='calvinL@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_yellow.png')
    davidJ = User(
        username='David J', email='davidJ@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_purple.png')
    fangruZ = User(
        username='Fangru Z', email='fangruZ@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_blue.png')
    grantC = User(
        username='Grant C', email='grantC@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_green.png')
    hansenG = User(
        username='Hansen G', email='hansenG@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_blue.png')
    hengW = User(
        username='Heng W', email='hengW@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_dark_pink.png')
    abbyF = User(
        username='Abby F', email='abbyF@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_purple.png')
    isabelA = User(
        username='Isabel A', email='isabelA@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_pink.png')
    jairC = User(
        username='Jair C', email='jairC@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_red.png')
    jonathanA = User(
        username='Jonathan A', email='jonathanA@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_yellow.png')
    kevinZ = User(
        username='Kevin Z', email='kevinZ@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_purple.png')
    lynnetteN = User(
        username='Lynnette N', email='lynnetteN@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_blue.png')
    aliceL = User(
        username='Alice L', email='aliceL@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_green.png')
    reneeL = User(
        username='Renee L', email='reneeL@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_blue.png')
    samanthaW = User(
        username='Samantha W', email='samanthaW@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_dark_pink.png')
    joonB = User(
        username='Joon B', email='joonB@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_purple.png')
    thomasA = User(
        username='Thomas A', email='thomasA@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_pink.png')
    timR = User(
        username='Tim R', email='timR@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_red.png')
    tingF = User(
        username='Ting F', email='tingF@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_yellow.png')
    varshaG = User(
        username='Varsha G', email='varshaG@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_purple.png')
    waseemA = User(
        username='Waseem A', email='waseemA@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_blue.png')
    yoniL = User(
        username='Yoni L', email='yoniL@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_green.png')
    yueH = User(
        username='Yue H', email='yueH@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_blue.png')
    zachH = User(
        username='Zach H', email='zachH@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_dark_pink.png')
    zeusR = User(
        username='Zeus R', email='zeusR@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_purple.png')
    zhihongL = User(
        username='Zhihong L', email='zhihongL@aa.io', password='password', profile_pic='https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_pink.png')


    db.session.add(demo)
    db.session.add(abbyF)
    db.session.add(alexZ)
    db.session.add(aliceL)
    db.session.add(allanY)
    db.session.add(antonyP)
    db.session.add(attiyaK)
    db.session.add(benD)
    db.session.add(brianA)
    db.session.add(calvinL)
    db.session.add(davidJ)
    db.session.add(fangruZ)
    db.session.add(grantC)
    db.session.add(hansenG)
    db.session.add(hengW)
    db.session.add(isabelA)
    db.session.add(jairC)
    db.session.add(jonathanA)
    db.session.add(joonB)
    db.session.add(kevinZ)
    db.session.add(lynnetteN)
    db.session.add(reneeL)
    db.session.add(samanthaW)
    db.session.add(thomasA)
    db.session.add(timR)
    db.session.add(tingF)
    db.session.add(varshaG)
    db.session.add(waseemA)
    db.session.add(yoniL)
    db.session.add(yueH)
    db.session.add(zachH)
    db.session.add(zeusR)
    db.session.add(zhihongL)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
