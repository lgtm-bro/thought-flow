"""Script to seed the database"""

import os
import json
from datetime import datetime


import crud
import model
import server

os.system('dropdb thoughts')
os.system('createdb thoughts')

model.connect_to_db(server.app)
model.db.create_all()

with open('data/feelingsWheel.json') as fw:
    data= json.loads(fw.read())

for f in data:
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

model.db.session.commit()


