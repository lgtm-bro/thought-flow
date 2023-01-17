# thoughtflow - a journaling app
An introduction to thought journaling

## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This app allows a user to indentify their emotions and write about them. The user's entries are stored and aggregated for their later reference.

## Features
* The feelings wheel section helps the user to identify and narrow down big feelings
* An inspirational quote replaces the feelings wheel section once the user identifies their feeling
* The message board greets the user, displays their current feeling, and guides the user through the app
* The user can change their current feeling by clicking on it in the message board
* The journal entry form allows the user to write about a feeling with guided prompts or in free form
* The milestone form allow the user to record breakthroughs and accomplishments along their journey
* The info hub displays the user's past journal entries, milestones, and a trend chart with a history of the user's past feelings
* The contact page allows the user to contact site admin and optionally recieve a copy of the message
* The profile page allows the user to view and change their personal data

## Technologies
* Python: 3.8
* Flask: 2.0
* Flask-SQLAlchemy: 2.5
* PostgreSQL: 14.5
* React: 18.2
* Webpack: 5.74
* Babel: 7.18
* React-chartjs-2: 5.1
* Luxon: 3.1
* React-icons: 4.7
* Bootstrap: 5.2

## Setup
#### To run this project, install it locally:
     $ cd ../thought-flow

     In one terminal (Node):
        $ npm install
        $ npm run build

     In a second terminal (Python):
        $ virtualenv env
        $ source env/bin/activate
        $ pip3 install -r requirements.txt
        $ source secrets.sh
        $ python3 seed.py   *to prepopulate with seed data*
        $ python3 server.py

     Note: You will need a secrets.sh file in the root directory with the following variables:
         * ADMIN_EMAIL - email address to recieve messages
         * GMAIL_PW - special password obtained from google auth for ADMIN_EMAIL
         * MAIL_PORT - set to gmail SMTP port (465)
         * API_TOKEN - favqs.com API key (https://favqs.com/api_keys)






