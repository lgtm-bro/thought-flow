"""CRUD operations"""

from sqlalchemy import desc, func
from model import User, BaseEmotion, SecondEmotion, ThirdEmotion, Post, Milestone, UserSession, connect_to_db, db

# ********USER********

def create_user(name, email, password):
    """Create and return a new user."""

    name = name.strip().lower().capitalize()
    email= email.lower()
    user = User(name=name, email=email, password=password)

    return user

def get_user(email):
    """Finds a user by email and returns it"""

    res = User.query.filter(User.email == email).first()
    if res:
        u = res.__dict__
        del u['_sa_instance_state']
        return u

    return False

def get_user_id(name):
    user = User.query.filter(User.name == name).first()

    if user:
        return user.id

    return None

def update_user_info(name, email, newEmail, newPassword, currentPassword):
    user = User.query.filter(User.email == email).update({
            User.name: name,
            User.email: newEmail or email,
            User.password: newPassword or currentPassword
        })

    if user:
        return user

    return False


# ********BASE_EMOTION********

def create_base_emotion(name, score):
    """Create and return a general emotion."""

    emotion = BaseEmotion(name=name, score=score)

    return emotion


def get_all_base_emotions():
    """Return all entries from the base_emotions table"""
    result = []
    for e in BaseEmotion.query.all():
        curr = e.__dict__
        del curr['_sa_instance_state']
        result.append(e.__dict__)

    return result


# ********SECOND_EMOTION********

def create_second_emotion(name, score, base_id):
    """Create and return a more specified emotion."""

    emotion = SecondEmotion(name=name, score=score, base_emotion_id=base_id)

    return emotion


def get_all_second_emotions(base):
    """Return all entries from the base_emotions table"""
    result = []
    for e in SecondEmotion.query.join(BaseEmotion).filter(BaseEmotion.name == base).all():
        curr = e.__dict__
        del curr['_sa_instance_state']
        result.append(e.__dict__)

    return result


# ********THIRD_EMOTION********

def create_third_emotion(name, score, second_id):
    """Create and return a nuanced emotion."""

    emotion = ThirdEmotion(name=name, score=score, second_emotion_id=second_id)

    return emotion


def get_all_third_emotions(second):
    """Return all entries from the base_emotions table"""
    result = []
    for e in ThirdEmotion.query.join(SecondEmotion).filter(SecondEmotion.name == second).all():
        curr = e.__dict__
        del curr['_sa_instance_state']
        result.append(e.__dict__)

    return result


def get_third_emotion(name):
    """Return one entry from the base_emotions table"""

    res = ThirdEmotion.query.filter(ThirdEmotion.name == name).first()
    if res:
        e = res.__dict__
        del e['_sa_instance_state']
        return e

    return {}


# ********POST********

def create_post(user_id, date, entry, guided):
    """Create and return a user's post."""

    post = Post(user_id=user_id, date=date, entry=entry, guided=guided)

    return post


def get_all_posts(user_id):
    """Return all posts for a user"""
    result = []
    for p in Post.query.join(User).filter(User.id == user_id).order_by(desc(Post.date)).all():
        curr = p.__dict__
        del curr['_sa_instance_state']
        result.append(curr)

    return result


def update_post(id, entry):
    # user = Post.query.join(User).filter()
    post = Post.query.filter(Post.id == id).update({
        Post.entry: entry
        })

    return post


def delete_post(id):
    return Post.query.filter(Post.id == id).delete()


# ********MILESTONE********

def create_milestone(user_id, title):
    """Create and return a user's milestone."""

    milestone = Milestone(user_id=user_id, title=title)

    return milestone


def get_all_milestones(user):
    """Return all milestones for a user"""
    result = []
    for m in Milestone.query.join(User).filter(User.name == user.lower().capitalize()).order_by(Milestone.id).all():
        curr = m.__dict__
        del curr['_sa_instance_state']
        result.append(curr)

    return result


def update_milestone(id, text):
    """Updates a milestone record in the db"""

    milestone = Milestone.query.filter(Milestone.id == id).update({
        Milestone.title: text
        })

    return milestone


def delete_milestone(id):
    """Deletes a milestone record from the db"""

    return Milestone.query.filter(Milestone.id == id).delete()




# ********PROMPT********

# def create_prompt(level, category, msg):
#     """Create and return a guiding prompt."""

#     prompt = Prompt(level=level, category=category, msg=msg)

#     return prompt


# ********USER_SESSION********

def create_user_session(user_id, base_id, second_id, third_id, date):
    """Create and return a user session."""

    user_session = UserSession(user_id=user_id, base_emotion_id=base_id, second_emotion_id=second_id,
    third_emotion_id=third_id, date=date)

    return user_session


def get_user_sessions(user_id=1000):


    sessions = UserSession.query.join(BaseEmotion).with_entities(BaseEmotion.name, func.count(UserSession.user_id))\
    .filter(UserSession.user_id == user_id).group_by(BaseEmotion.name).all()

    return sessions

    # select base_emotion_id, count(user_id) from user_sessions where user_id = 2 group by base_emotion_id



if __name__ == '__main__':
    from server import app
    connect_to_db(app)