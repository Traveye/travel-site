# DROPIN
![This is an image](./public/images/dropin.PNG)

## Description 

We created this project because it is easy to forget the memories and specifics that happen on a trip. So we created a application that allows user to pick any place on a map and journal their experiences on the trip. We wanted to make sure the that users can have multiple different trips with journal entries and we solved that by letting each pin on the map contain link to that specific trip and journal information.

App Link:
(http://dropin.herokuapp.com)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Badges](#badges)
* [Models and Routes](#models-and-routes)
* [New libraries/NPM Packages](#new-libraries/npm-packages)

## Installation

Steps:
1. Click the link
2. Once landed on home page if you haven't signed up then click signup and enter information needed.
![This is an image](./public/images/signUpRoute.png)
3. If you have signed up the login with user information.
4. You will land on a dashboard page and you can start adding pins to begin you journey.
![This is an image](./public/images/pinPostRoute.png)


## Usage 

Steps:
1. Now that you are in the page and started creating pin you can get to the trip information by clicking pin and clicking on the "View Journal" link.
![This is an image](./public/images/pinGetRoute.png)
2. Now that you're in journal you can add a trip and details on the trip.
![This is an image](./public/images/tripPostRoute.png)
3. You can edit the pin name, trip, trip details, and notes.
![This is an image](/public/images/pinPutRoute.png)
4. Also you can delete the pin, trips, trip details, and notes all on the same page.
![This is an image](./public/images/pinDeleteRoute.png)
5. Nav bar is used to direct you home which is the dashboard or log out when you feel it is necessary.

## Models and Routes

Below is an ERD of our database schema and table relationships. We used MySQL for our database and Sequelize for our ORM.

![ERD](./assets/images/db-erd.png)

Below is a list of our API routes and their corresponding controller methods.

| Route | HTTP Verb | Description |
| ----- | --------- | ----------- |
| `/api/users` | `GET` | Get all users |
| `/api/users` | `POST` | Create a new user |
| `/api/users/:id` | `GET` | Get a user by id |
| `/api/users/:id` | `PUT` | Update a user by id |
| `/api/pins` | `GET` | Get all pins |
| `/api/pins` | `POST` | Create a new pin |
| `/api/pins/:id` | `GET` | Get a pin by id |
| `/api/pins/:id` | `PUT` | Update a pin by id |
| `/api/pins/:id` | `DELETE` | Delete a pin by id |
| `/api/trips` | `GET` | Get all trips |
| `/api/trips` | `POST` | Create a new trip |
| `/api/trips/:id` | `GET` | Get a trip by id |
| `/api/trips/:id` | `PUT` | Update a trip by id |
| `/api/trips/:id` | `DELETE` | Delete a trip by id |
| `/api/journals` | `GET` | Get all trip journals |
| `/api/journals` | `POST` | Create a new trip journal |
| `/api/journals/:id` | `GET` | Get a trip journal by id |
| `/api/journals/:id` | `PUT` | Update a trip journal by id |
| `/api/journals/:id` | `DELETE` | Delete a trip journal by id |

## New libraries/NPM Packages

[Leaflet](https://leafletjs.com/) - Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. We use it to load a map on our page and allow users to drop pins on the map.

![example-gif](./assets/images/leaflet-example.gif)

[SweetAlert](https://sweetalert2.github.io/) - A beautiful, responsive, customizable, and accessible replacement for JavaScript's popup boxes. Zero dependencies.

![example-gif](./assets/images/sweetalert-example.gif)

## Credits

Travis Dupree
https://github.com/Traveye
McCoy Didericksen
https://github.com/mccoydidericksen
Jonathan Pohahau
https://github.com/j-pohahau5 
https://tailwindcss.com/
https://leafletjs.com/
https://sweetalert2.github.io/
https://www.cloudflare.com/
https://www.w3schools.com/
https://developer.mozilla.org/en-US/
https://getbootstrap.com/
https://choosealicense.com/licenses/mit/


## License

MIT License

Copyright (c) [2023] [DROPIN]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Badges

![badge](https://img.shields.io/badge/license-MIT-orange)
![badge](https://img.shields.io/badge/language-JavaScript-green)
![badge](https://img.shields.io/badge/language-Nodejs-brightgreen)
![badge](https://img.shields.io/badge/library-HandleBars-lightgrey) 
![badge](https://img.shields.io/badge/library-Leaflet-yellowgreen)
![badge](https://img.shields.io/badge/library-SweetAlert-pink)
![badge](https://img.shields.io/badge/DataBase-MySQL-blueviolet)
![badge](https://img.shields.io/badge/npm-sequelize-red)
![badge](https://img.shields.io/badge/npm-dotenv-red)
![badge](https://img.shields.io/badge/npm-bcrypt-red)
![badge](https://img.shields.io/badge/npm-express-red)
![badge](https://img.shields.io/badge/npm-dotenv-red)
![badge](https://img.shields.io/badge/npm-nodemon-red)
![badge](https://img.shields.io/badge/npm-dotenv-red)
![badge](https://img.shields.io/badge/npm-dotenv-red)
![badge](https://img.shields.io/badge/npm-dotenv-red)
![badge](https://img.shields.io/badge/npm-dotenv-red)