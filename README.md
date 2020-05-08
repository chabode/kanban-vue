# kanban
Creating fancy kanban
- with express, sequelize, postgres, bcrypt and jsonwebtoken in server
- using vue, css and html in client
Additional: Google Sign In

## RESTful Endpoints

### POST /register
> Register new user

_Request Header_
```
None
```

_Request Body_
```
{
    "email" : <email to insert here>,
    "password" : <password to insert here>
}
```
_Response (201)_
```
{
    "message" : "new email has been registered"
}
```
_Response (500)_
```
{
    "message" : "Invalid Email Or Password"
}
```

### POST /login
> Login user

_Request Header_
```
None
```

_Request Body_
```
{
    "email" : <email to insert here>,
    "password" : <password to insert here>
}
```
_Response (200)_
```
{
    "access_token" : <your private access token>,
    "email" : <your registered email>
}
```
_Response (400)_
```
{
    "message" : "Invalid Email Or Password"
}
```
_Response (500)_
```
{
    "message" : "Internal Server Error"
}
```
### POST /googleSignIn
> Login user

_Request Header_
```
None
```

_Request Body_
```
{
    "id_token" : <generated google token>,
    "g_name" : <generated google name>
}
```
_Response (200)_
```
{
    "access_token" : <your private access token>,
    "email" : <your registered google email>
}
```
_Response (400)_
```
{
    "message" : "Invalid Token"
}
```
_Response (500)_
```
{
    "message" : "Internal Server Error"
}
```

### GET /task
> Get all task in database

_Request Header_
```
Not needed
```

_Request Body_
```
Not Needed
```

_Response (200)_
```
[
    {
        "id" : 1,
        "title" : <your task name>,
        "category" : <your task category>,
        "UserId" : <registered user id>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    },
    {
        "id" : 2,
        "title" : <your task name>,
        "description" : <your task category>,
        "status" : <registered user id>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```
_Response (500)_
```
{
    "message" : "Internal Server Error"
}
```

### POST /task
> Create new task

_Request Header_
```
{
    "access_token" = "<your access token>"
}
```

_Request Body_
```
{
    "title" : <title to get insert into>,
    "category" : <category to get insert into>,
    "UserId" : <your user id when logged in>
}
```

_Response (201 - created)_
```
[
    {
        "id" : <given by sistem>,
        "title" : <posted task>,
        "category" : <posted category>,
        "UserId" : <posted user id>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```

_Response (400 - Bad Request)_
```
{
    "message" : "<error message>"
}
```

### PATCH /task/:id
> Edit category task from certain id

_Request Header_
```
{
    "access_token" = "<your access token>"
}
```

_Request Body_
```
{
    "id" : <your designated id todo>,
    "category" : <edited category>,
}
```

_Response (200)_
```
[
    {
        "id" : <your given id>,
        "title" : <your task name based on id>,
        "category" : <your edited task category>,
        "UserId" : <your user id based on task>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```
_Response (403)_
```
{
    "message" : "Forbidden Access"
}
```
_Response (404)_
```
{
    "message" : "<data not found>"
}
```
_Response (500)_
```
{
    "message" : "<error message>"
}
```

### DELETE /task/:id
> Delete todo from certain id

_Request Header_
```
{
    "access_token" = "<your access token>"
}
```

_Request Body_
```
{
    "id" : <your designated id todo>,
}
```

_Response (200)_
```
[
    {
        "message" : "data has been deleted"
    }
]
```
_Response (403)_
```
{
    "message" : "Forbidden Access"
}
```
_Response (404)_
```
{
    "message" : "<data not found>"
}
```
_Response (500)_
```
{
    "message" : "<error message>"
}
```