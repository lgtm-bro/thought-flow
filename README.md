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
A few things you can do on thoughtflow:
* Identify and narrow down big feelings based on the feelings wheel
  <br/>
  <img src="/assets/thoughtflow_feelings.gif" width="404" height="296"/><br/>
* Write about a feeling with guided prompts or in free form
  <br/>
  <img src="/assets/thoughtflow_entry.gif" width="404" height="296"/><br/>
* Record breakthroughs and accomplishments
* Read, edit, and delete past journal entries and milestones
* See your past feelings entries displayed in a trends chart
  <br/>
   <img src="/assets/thoughtflow_hub.gif" width="404" height="296"/>

## Technologies
    Python: 3.8
    Flask: 2.0
    Flask-SQLAlchemy: 2.5
    PostgreSQL: 14.5
    React: 18.2
    Webpack: 5.74
    Babel: 7.18
    React-chartjs-2: 5.1
    Luxon: 3.1
    React-icons: 4.7
    Bootstrap: 5.2

## Setup
### To run this project, install it locally:
     $ cd ../thought-flow

     In one terminal (Node):
        $ npm install
        $ npm run build

     In a second terminal (Python):
        $ virtualenv env
        $ source env/bin/activate
        $ pip3 install -r requirements.txt
        $ source secrets.sh
        $ python3 seed.py (to prepopulate with seed data)
        $ python3 server.py


### Development Keys:
* ADMIN_EMAIL - email address to recieve messages
* GMAIL_PW - [gmail app password](https://support.google.com/accounts/answer/185833?hl=en) for ADMIN_EMAIL
* MAIL_PORT - set to gmail SMTP port (465)
* API_TOKEN - [favqs.com API key](https://favqs.com/api_keys)