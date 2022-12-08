"""CRUD operations"""

from model import User, BaseEmotion, SecondEmotion, ThirdEmotion, Post, Milestone, Prompt, UserSession, connect_to_db

# ********USER********

def create_user(name, email, password):
    """Create and return a new user."""

    user = User(name=name, email=email, password=password)

    return user

# ********BASE_EMOTION********

def create_base_emotion(name, score):
    """Create and return a general emotion."""

    emotion = BaseEmotion(name=name, score=score)

    return emotion


# ********SECOND_EMOTION********

def create_second_emotion(name, score, base_id):
    """Create and return a more specified emotion."""

    emotion = SecondEmotion(name=name, score=score, base_emotion_id=base_id)

    return emotion


# ********THIRD_EMOTION********

def create_third_emotion(name, score, second_id):
    """Create and return a nuanced emotion."""

    emotion = ThirdEmotion(name=name, score=score, second_emotion_id=second_id)

    return emotion


# ********POST********

def create_post(user_id, date, entry, guided):
    """Create and return a user's post."""

    post = Post(user_id=user_id, date=date, entry=entry, guided=guided)

    return post


# ********MILESTONE********

def create_milestone(user_id, title, msg):
    """Create and return a user's milestone."""

    milestone = Milestone(user_id=user_id, title=title, msg=msg)

    return milestone


# ********PROMPT********

def create_prompt(level, category, msg):
    """Create and return a guiding prompt."""

    prompt = Prompt(level=level, category=category, msg=msg)

    return prompt


# ********USER_SESSION********

def create_user_session(user_id, post_id, date, score, milestone_id,
                        base_id=None, second_id=None, third_id=None):
    """Create and return a user session."""

    user_session = UserSession(user_id=user_id, post_id=post_id,
                date=date, score=score, milestone_id=milestone_id,
                base_id=base_id, second_id=second_id, third_id=third_id)

    return user_session



if __name__ == '__main__':
    from server import app
    connect_to_db(app)