"""Server for the thought flow app"""

from flask import (Flask, render_template, redirect, request, jsonify, flash, session, abort)
from jinja2 import StrictUndefined
from random import choice
import requests
import os
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
    emotion = crud.get_third_emotion(name)

    return jsonify(emotion)


@app.route('/milestones/<user>')
def get_all_milestones(user):
    milestones = crud.get_all_milestones(user)

    return jsonify(milestones)


@app.route('/posts/<user>')
def get_all_posts(user):
    posts = crud.get_all_posts(user)

    return jsonify(posts)


@app.route('/users/<email>')
def get_user(email):
    user = crud.get_user(email)
    if user:
        if user['password'] == request.args.get('password'):
            return jsonify(user)

        # raise ValueError("Invalid Password")
        return jsonify({
                        "success": False,
                        "msg": "That password does not match our records.\nPlease try again."
                        }), 403

    return jsonify({
                    "success": False,
                    "msg": "That email is not in our system.\nPlease create an account."
                    }), 404


@app.route('/signup', methods=['POST'])
def signup_user():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    if crud.get_user(email):
        return jsonify({"success": False, "msg": "User already has an account"}), 400

    new_user = crud.create_user(name, email, password)
    db.session.add(new_user)
    db.session.commit()

    print(stars, new_user.name)

    return jsonify({"success": True, "user": new_user.name, "msg": "User successfully created"}), 201


@app.route('/posts', methods=['POST'])
def submit_post():
    user = request.json.get('user')
    date= request.json.get('date')
    entry= request.json.get('entry')
    guided = request.json.get('guided')

    user_id = crud.get_user_id(user)

    if user_id:
        new_post = crud.create_post(user_id, date, entry, guided)
        db.session.add(new_post)
        db.session.commit()

        return jsonify({"success": True, "msg": "Post successfully saved"}), 201

    return jsonify({"success": False, "msg": "The user is not in our system"}), 400


@app.route('/milestones/<user>', methods=['POST'])
def addMilestone(user):
    user_id = crud.get_user_id(user)
    title = request.json.get('title')
    msg = request.json.get('details')

    if user_id:
      new_milestone = crud.create_milestone(user_id, title, msg)
      db.session.add(new_milestone)
      db.session.commit()

      return jsonify({"success": True, "msg": "Milestone successfully saved"}), 201

    return jsonify({"success": False, "msg": "The user is not in our system"}), 400


@app.route('/quote/<keyword>')
def getQuote(keyword):
    token = os.environ['API_TOKEN']

    headers = {'Authorization': f'Token token={token}',
              'Content-Type': 'application/json'
              }
    res = requests.get(f'https://favqs.com/api/quotes/?filter={keyword}&type=tag', headers=headers)
    quotes = res.json()['quotes']
    quote = choice(quotes)

    return jsonify(quote)




if __name__ =='__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)