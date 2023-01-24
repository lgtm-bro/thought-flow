"""Script to seed the database"""

import os
import json
from datetime import datetime


import crud
import model
import server

os.system('dropdb thoughts --if-exists')
os.system('createdb thoughts')

model.connect_to_db(server.app)
model.db.create_all()

def seed_data(file, func):
    with open(file) as fw:
        data = json.loads(fw.read())
    func(data)

def seed_feelings(feeling_data):
    for f in feeling_data:
        name, score = f['base'].values()
        base = crud.create_base_emotion(name, score)
        model.db.session.add(base)
        model.db.session.commit()
        for second_feeling in f['secondRing']:
            s_name, s_score = second_feeling['feeling'].values()
            second = crud.create_second_emotion(s_name, s_score, base.id)
            model.db.session.add(second)
            model.db.session.commit()
            for third_feeling in second_feeling['sub_feelings']:
                t_name, t_score = third_feeling.values()
                third = crud.create_third_emotion(t_name, t_score, second.id)
                model.db.session.add(third)
                model.db.session.commit()


def seed_users(user_data):
    for u in user_data:
        name, email, password = u.values()
        user = crud.create_user(name, email, password)
        model.db.session.add(user)

    model.db.session.commit()


def seed_milestones(milestone_data):
    for m in milestone_data:
        user_id, title = m.values()
        ms = crud.create_milestone(user_id, title)
        model.db.session.add(ms)

    model.db.session.commit()


def seed_posts(post_data):
    for p in post_data:
        user_id, date, entry, guided = p.values()
        post = crud.create_post(user_id, date, entry, guided)
        model.db.session.add(post)

    model.db.session.commit()

def seed_user_sessions(session_data):
    for s in session_data:
        user_id, base_id, second_id, third_id, date = s.values()
        user_session = crud.create_user_session(user_id, base_id, second_id, third_id, date)
        model.db.session.add(user_session)

    model.db.session.commit()


seed_data('data/feelingsWheel.json', seed_feelings)
seed_data('data/users.json', seed_users)
seed_data('data/milestones.json', seed_milestones)
seed_data('data/posts.json', seed_posts)
seed_data('data/user_sessions.json', seed_user_sessions)