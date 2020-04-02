# Getting started

To get the Node server running locally:

- Clone this repo
- npm install to install all required dependencies
- Install MongoDB
- Change the enviroment variables in config folder as required
- npm run start the local server

# Application Structure

- server.js - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.

- config/ - This folder contains configuration for mongodb.
- routes/ - This folder contains the route definitions for our API.
- models/ - This folder contains the schema definitions for our Mongoose models.
- controllers/ - This folder contains the actions to be performed on the routes.

# API

## API to rreate a question

URL [POST]: /api/v1/questions/create

```
//request
{
  "title" : "Which is your favorite programming language?"
}

//response
{
    "success": true,
    "body": {
        "options": [],
        "_id": "5e86083b42710740343ef840",
        "title": "Which is your favorite programming language?",
        "__v": 0
    }
}
```

## API to delete a question

URL [DELETE]: /api/v1/questions/:id/delete

```
//response
{
    "success": true
}
```

## API to create an option

URL [POST]: /api/v1/questions/:id/options/create

```
//response
{
    {
    "success": true,
    "body": {
        "votes": 0,
        "_id": "5e8608df42710740343ef845",
        "text": "Python",
        "question": "5e8608bb42710740343ef841",
        "__v": 0,
        "link_to_vote": "http://localhost:5000/options/5e8608df42710740343ef845/add_vote"
    }
}
}
```

## API to get all details of a question

URL [GET]: /api/v1/questions/:id

ACCESS : Private

```
//response
{
    "success": true,
    "body": {
        "options": [
            {
                "votes": 0,
                "_id": "5e8608d442710740343ef842",
                "text": "JAVA",
                "question": "5e8608bb42710740343ef841",
                "__v": 0,
                "link_to_vote": "http://localhost:5000/options/5e8608d442710740343ef842/add_vote"
            },
            {
                "votes": 0,
                "_id": "5e8608d942710740343ef844",
                "text": "C++",
                "question": "5e8608bb42710740343ef841",
                "__v": 0,
                "link_to_vote": "http://localhost:5000/options/5e8608d942710740343ef844/add_vote"
            },
            {
                "votes": 0,
                "_id": "5e8608df42710740343ef845",
                "text": "Python",
                "question": "5e8608bb42710740343ef841",
                "__v": 0,
                "link_to_vote": "http://localhost:5000/options/5e8608df42710740343ef845/add_vote"
            }
        ],
        "_id": "5e8608bb42710740343ef841",
        "title": "Which is your favorite programming language?",
        "__v": 3
    }
}
```

## API to destroy a option

URL [DELETE]: /api/v1/options/:id/delete

```
//response
{
    "sucess": true
}
```

## API to increase vote for an option

URL [POST]: /api/v1/options/:id/add_vote

```

//response
{
    "success": true,
    "body": {
        "votes": 1,
        "_id": "5e8608d942710740343ef844",
        "text": "C++",
        "question": "5e8608bb42710740343ef841",
        "__v": 0,
        "link_to_vote": "http://localhost:5000/options/5e8608d942710740343ef844/add_vote"
    }
}
```
