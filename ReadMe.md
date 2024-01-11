# Polling system API

A BackEnd API that allows developers to create, manage, and retrieve data from a polling system. A polling system is a platform that enables users to create polls, surveys, and quizes and gather responses from participants.

## Polling system Features

- Create questions
- Add options to question
- Delete a question
- Delete an option
- Add vote to an option
- View a question with all of its options

## Installation Guide

- Clone this repository.
- Run npm install to install all the dependencies.
- Create an .env file in your project root folder and add your variables. See .env.sample for assistance.

## Usage

- Run npm start to start the application.
- Connect to the API using Postman on port 8000.

## API Endpoints

| HTTP Verbs | Endpoints                     | Action                                |
| ---------- | ----------------------------- | ------------------------------------- |
| POST       | /questions/create             | To create a question                  |
| POST       | /questions/:id/options/create | To add options to a specific question |
| DELETE     | /questions/:id/delete         | To delete a question                  |
| DELETE     | /options/:id/delete           | To delete an option                   |
| PUT        | /options/:id/add_vote         | To increase the count of votes        |
| GET        | /questions/:id                | To view a question and its options    |

## GitHub Repository Link
https://github.com/VishnuAjk/Polling_System_API
