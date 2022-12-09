"""Server for the thought flow app"""

from flask import (Flask, render_template, redirect, request, jsonify, flash, session)
from jinja2 import StrictUndefined
from model import connect_to_db, db
import crud


app = Flask(__name__)
app.secret_key = 'dev'
app.jinja_env.undefined = StrictUndefined

stars = '*' * 10


@app.route('/')
def show_home():
    """View homepage."""

    return render_template('index.html')


@app.route('/base_emotions')
def get_base_emotions():
    base_emotions = crud.get_all_base_emotions()

    return jsonify(base_emotions)


@app.route('/second_emotions/<base_choice>')
def get_second_emotions(base_choice):
    second_emotions = crud.get_all_second_emotions(base_choice)

    return jsonify(second_emotions)


@app.route('/third_emotions/<second_choice>')
def get_third_emotions(second_choice):
    third_emotions = crud.get_all_third_emotions(second_choice)

    return jsonify(third_emotions)


@app.route('/third_emotion/<name>')
def get_third_emotion(name):
    print(stars, 'name', name)
    emotion = crud.get_third_emotion(name)
    print(stars, 'emotion', emotion)

    return jsonify(emotion)


@app.route('/milestones/<user>')
def get_all_milestones(user):
    milestones = crud.get_all_milestones(user)

    return jsonify(milestones)


@app.route('/posts/<user>')
def get_all_posts(user):
    posts = crud.get_all_posts(user)

    return jsonify(posts)


if __name__ =='__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)