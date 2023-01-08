"""Server for the thought flow app"""

from flask import (Flask, render_template, redirect, request, jsonify, flash, session, abort)
from jinja2 import StrictUndefined
import smtplib, ssl
from email.message import EmailMessage


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
    """Renders root JSX component"""

    return render_template('index.html')


#********************USER********************

@app.route('/users/<email>')
def get_user(email):
    """Retrieves all fields for a user with the given email"""

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
    """Check that the user email does not exist in the db and creates a new user record in the db

       Returns the user name field as user
    """

    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    if crud.get_user(email):
        return jsonify({"success": False, "msg": "There is an account associated with that email.\nPlease login."}), 400

    new_user = crud.create_user(name, email, password)
    db.session.add(new_user)
    db.session.commit()

    print(stars, new_user.name)

    return jsonify({"success": True, "user": new_user.name, "email": new_user.email, "msg": "User successfully created"}), 201


@app.route('/update_user/<email>', methods=['PUT'])
def update_user(email):
    """Updates user info with input from the profile page"""

    name = request.json.get('name')
    currentPassword = request.json.get('currentPassword')
    newPassword = request.json.get('newPassword')
    newEmail = request.json.get('newEmail')

    user = crud.get_user(email)
    if currentPassword != user['password']:
        return jsonify({"success": False, "msg": "The current password you've entered is incorrect."}), 401

    updated_user = crud.update_user_info(name, email, newEmail, newPassword, currentPassword)
    db.session.commit()

    if updated_user:
        return jsonify({"success": True, "msg": "User successfully update"}), 201

    return jsonify({"success": False, "msg": "There is no account with that email"}), 401


#********************EMOTIONS********************

@app.route('/base_emotions')
def get_base_emotions():
    """Retrieves all base emotion names from the db and return them to the client"""

    base_emotions = crud.get_all_base_emotions()

    return jsonify(base_emotions)


@app.route('/second_emotions/<base_choice>')
def get_second_emotions(base_choice):
    """Retrieves all sub emotion names for a given base emotion from the db and returns them to the client"""

    second_emotions = crud.get_all_second_emotions(base_choice)

    return jsonify(second_emotions)


@app.route('/third_emotions/<second_choice>')
def get_third_emotions(second_choice):
    """Retrieves all sub emotion names for a given second emotion from the db and returns them to the client"""

    third_emotions = crud.get_all_third_emotions(second_choice)

    return jsonify(third_emotions)


@app.route('/third_emotion/<name>')
def get_third_emotion(name):
    """Retrieves all fields of a given third emotion from the db and returns them to the client"""

    emotion = crud.get_third_emotion(name)

    return jsonify(emotion)


#********************CONTACT********************

@app.route('/contact', methods=['POST'])
def submit_contact_form():
    """Send a contact email from a user to the company email"""

    # REQ DATA
    mail_from = os.environ['ADMIN_EMAIL']
    mail_to = os.environ['CONTACT_EMAIL']
    subject = request.json.get('subject')
    body = request.json.get('body')
    user_name = request.json.get('name')
    user_email = request.json.get('email')
    wants_copy = request.json.get('copy')

    port = os.environ['MAIL_PORT']
    pw = os.environ['GMAIL_PW']
    context = ssl.create_default_context()

    # EMAIL HEADERS
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = mail_from
    msg["To"] = mail_from

    # EMAIL BODY
    msg.set_content(f"\nA message from {user_name} at {user_email}:\n\n{body}")

    # SEND MAIL
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(mail_from, pw)
        server.sendmail(mail_from, mail_from, msg.as_string())

        if wants_copy:
            cp_msg = EmailMessage()
            cp_msg["Subject"] = f"Re: {subject}"
            cp_msg["From"] = mail_from
            cp_msg["To"] = user_email
            cp_body = f"\nHi {user_name.capitalize()},\n\nThank you for contacting thoughtflow. As requested, here is a copy of your message: \n\n\n{body}"
            cp_msg.set_content(cp_body)

            server.sendmail(mail_from, user_email, cp_msg.as_string())

        server.quit()

    # HTTP RESPONSE
    return jsonify({"success": True, "msg": "Your email has been sent "}), 201


    #TO TEST IN TERMINAL
        # server = smtplib.SMTP("localhost", 1025)
        # cmd to run second server:
        #   python -m smtpd -n -c DebuggingServer localhost:1025


#********************POSTS********************

@app.route('/posts/<user_id>')
def get_all_posts(user_id):
    """Retrieves all fields for all posts for a given user from the db and return them to the client"""

    posts = crud.get_all_posts(user_id)

    return jsonify(posts)


@app.route('/posts', methods=['POST'])
def submit_post():
    """Creates a new post record in the db for a given user"""

    user = request.json.get('user')
    date= request.json.get('date')
    entry= request.json.get('entry')
    guided = request.json.get('guided')

    user_id = crud.get_user_id(user)

    if user_id:
        new_post = crud.create_post(user_id, date, entry, guided)
        db.session.add(new_post)
        db.session.commit()

        return jsonify({"success": True, "post_id": new_post.id, "msg": "Post successfully saved"}), 201

    return jsonify({"success": False, "msg": "The user is not in our system"}), 400


@app.route('/posts/update/<id>', methods=['PUT'])
def updatePost(id):
    """Updates a post record in the db"""

    entry = request.json.get('newEntry')
    res = crud.update_post(id, entry)

    if res:
        db.session.commit()
        # print(stars, res.user_id)

        return jsonify({"success": True, "msg": "Post successfully updated"}), 200

    return jsonify({"success": False, "msg": "The post is not in our system"}), 400


@app.route('/posts/delete/<id>', methods=['DELETE'])
def delete_post(id):
    """Deletes a post record with the given id"""

    res = crud.delete_post(id)

    if res:
        db.session.commit()
        return jsonify({"success": True, "msg": "Post successfully deleted"}), 200

    return jsonify({"success": False, "msg": "The post is not in our system"}), 400


#********************MILESTONES********************

@app.route('/milestones/<user>')
def get_all_milestones(user):
    """Retrieves all milestone titles for a given user from the db and return them to the client"""

    milestones = crud.get_all_milestones(user)

    return jsonify(milestones)


@app.route('/milestones/<user>', methods=['POST'])
def addMilestone(user):
    """Creates a new milestone record in the db for a given user"""

    user_id = crud.get_user_id(user)
    title = request.json.get('title')

    if user_id:
      new_milestone = crud.create_milestone(user_id, title)
      db.session.add(new_milestone)
      db.session.commit()

      return jsonify({"success": True, "milestone_id": new_milestone.id, "msg": "Milestone successfully saved"}), 201

    return jsonify({"success": False, "msg": "The user is not in our system"}), 400


@app.route('/milestone/<id>',methods=['PUT'])
def update_milestone(id):
    """Updates a milestone record in the db"""

    print(stars, 'update id', id)
    text = request.json.get('text')
    print(stars, 'update text', text)

    milestone = crud.update_milestone(id, text)


    if milestone:
        db.session.commit()
        return jsonify({"success": True, "msg": "Milestone successfully updated"}), 200

    return jsonify({"success": False, "msg": "Please create a new milestone"}), 400


@app.route('/milestone/<id>',methods=['DELETE'])
def delete_milestone(id):
    """Deletes a milestone record from the db"""

    print(stars, 'delete id', id)
    res = crud.delete_milestone(id)

    if res:
        db.session.commit()
        return jsonify({"success": True, "msg": "Milestone successfully deleted"}), 200

    return jsonify({"success": False, "msg": "That milestone cannot be found"}), 400


    #********************QUOTES********************

@app.route('/quote/<keyword>')
def getQuote(keyword):
    """Retrieves a quote from an external API based on a keyword"""

    token = os.environ['API_TOKEN']

    headers = {'Authorization': f'Token token={token}',
              'Content-Type': 'application/json'
              }
    res = requests.get(f'https://favqs.com/api/quotes/?filter={keyword}&type=tag', headers=headers)
    quotes = res.json()['quotes']
    quote = choice(quotes)

    return jsonify(quote)


@app.route('/new-quote')
def getQuote2():
    """Retrieves a quote from an external API"""

    res = requests.get('https://type.fit/api/quotes')
    data = res.json()
    quote = choice(data)

    # print('***** QUOTES', data)

    return jsonify(quote), 200


    #********************SESSIONS********************

@app.route('/sessions', methods=['POST'])
def createSession():
    """Creates a record of all user data in a browser session"""

    session = request.get_json()
    user_id, base_id, second_id, third_id, date = session.values()

    new_sess = crud.create_user_session(user_id, base_id, second_id, third_id, date)

    if new_sess:
        db.session.add(new_sess)
        db.session.commit()

        return jsonify({"success": True, "msg": "Session successfully created"}), 201

    return jsonify({"success": False, "msg": "Unable to create session"}), 400


@app.route('/sessions/<user_id>')
def get_user_sessions(user_id):
    """returns all sessions of the user with the given id grouped by base_emotion_id"""

    print(stars, user_id)
    if not user_id:
        return jsonify({"success": False, "msg": "No user_id sent"}), 300

    sessions = crud.get_user_sessions(user_id)

    if sessions:
        return jsonify(dict(sessions))

    return jsonify({"success": False, "msg": "Cannot find sessions for that user"}), 400


if __name__ =='__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', port=5000,  debug=True)