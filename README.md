# Strive Assessment
This is the strive assessment project. It is made with Laravel 5.6 and Angular 1.7
## Setup and Installation
To run this locally, a few things need to be made

*Note: all commands should be run from the root directory 

First, lets get all our assets in order
> composer install

> npm install

Now, lets compile just the front end assets

> npm run dev

^for this point, npm run prod is failing because it couldn't minify, I would rather spend time completing the excercise but may come back to this.

Laravel itself, needs a parameters file, which in this case will be .env file
> touch .env

You can copy the generic laravel .env contents from this gist: https://github.com/laravel/laravel/blob/master/.env.example

For this application, the only things we need are APP_NAME, APP_ENV, APP_KEY, APP_DEBUG, APP_URL, DB_CONNECTION, and DB_DATABASE

DB_DATABASE should equal sqlite, and DB_CONNECTION is going to be the destination of the database file. I personally used database/database.sqlite, and I recommend you do the same

Depending on where you want to create your database.sqlite file, just make sure it lines up with the DB_CONNECTION parameter, for my recommendation, I used database/database.sqlite, so please enter the following command
> touch database/database.sqlite

Then, just run the migration for our two tables, Users and Question Response
> php artisan migrate

Lastly, run
> php artisan serve

to start the app server

## Database Information
Migrations can be found under database/migrations, it contains two migrations, one to create the users table and one to create the question response table.

The migration file has a pretty easy to read schema definition, it currently contains a foreign key with the relationship Has One for both ways of User and Question Response



factories/seeds were not used

## DB Models
The two models can be found under app/Models

Using the Eloquent ORM, you can set the FK association with the proper naming convention, or a custom one that must be specified

## Routing
Routes can be found under routes/web.php, currently, essentially hosted on the default root route of Laravel with angular taking care of most of the front end routing and using Laravel as an API

## Back end Controllers
These can be found under app/Http/Controllers

Almost all written code was in UserController.php

There are currently 4 endpoints,
 
1). Get user information

2). Validate User

3). Save User

4). Complete User Questionnaire 

## Front End
All custom JS code is found under resources/assets/js

All custom CSS code is found under resources/assets/sass

All views/html code is found under resources/views

Webpack configuration is on root folder under webpack.mix.js

## Application Structure Q&A
### Routing
Because this isn't a typical crud app, the routes used aren't as 'restful' as you would expect it. For instance, there are two save functions; one will save the answers, the other will save the answers AND check the 'completed' flag on the user model. It can actually be implemented better by just having one route with a additive parameter of whether to complete it instead of writing two different routes.

As soon as the completion of the questionnaire is done, no further edits can be made.

Get request is pretty standard

### Table Schema
There are currently two tables, Users and Responses

Fields in Users: 
- ID
- First Name (varchar(255))
- Last Name (varchar(255))
- Email (unique)
- Event ID (unique)
- Time Remaining (int)
- Completed (boolean)
- Timestamps

Fields in Responses:
- ID
- User ID (FK relationship pointing to ID of users table)
- Question 1 response (medium text)
- Question 2 response (medium text)
- Question 3 response (medium text)
- Question 4 response (medium text)
- Question 5 response (medium text)
- Timestamps

I made the questionnaire field medium text because you can't account for how long it will be; it doesn't seem necessary that it will be larger than 16mb in 1 textbox (hopefully). Perhaps logic to truncate it or front end validation should be written in place would be helpful (was not done).

Time remaining was stored as milliseconds, but probably should've been done as seconds since the feature isn't super intensive on strict timing outside of account for 15 min in total time.

### Front End
The page routing was handled using Angular JS and UI-Router which uses states as opposed to traditional routing. Architecturally, it saved some bandwidth in which going between questions needed another request-response cycle. Only a portion of the DOM got replaced between going on to the next question. I wrapped the entire questionnaire inside an angular controller and kept all 5 answers saved in memory throughout the process while also persisting that data every 15 min as an autosave feature. 