# Strive Assessment
To run this locally, a few things need to be made
The destination of the sqlite DB is specific at
database/database.sqlite, so from the root of the folder just type
> touch database/database.sqlite

Next, run 
> composer install

> npm install

> npm run dev

^for this point, npm run prod is failing because it couldn't minify, I would rather spend time completing the excercise but may come back to this

That should generate the DB and compile all assets needed.

Lastly, run
> php artisan serve

to start the app server

## Database Information
This can be found under database/migrations

factories/seeds were not used

## DB Models
I created two, User, and QuestionResponse and these can be found under app/Models

## Routing
Routes can be found under routes/web.php

## Back end Controllers
These can be found under app/Http/Controllers

Almost all written code was in UserController.php

## Front End
All custom JS code is found under resources/assets/js

All custom CSS code is found under resources/assets/sass

All views/html code is found under resources/views

Webpack configuration is on root folder under webpack.mix.js
