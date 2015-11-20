# API Documentation

## Index
* [Introduction](#intro)
    * [API Version](#version)
    * [Base URL](#base)
    * [Client ID](#id)
* [APIs](#api)
    * [Get Lecture](#get-lecture)
    * [Add Comment](#add-comment)
    * [Get Comments](#get-comments)
    * [Set Comment Rating](#set-rating)
    * [Get Comment Rating](#get-rating)
    * [Get Engagements](#get-engagements)
    * [Add Engagement Update](#add-engagement)
    * [Login](#login)
    * [Check Login](#check-login)
    * [logout] (#logout)
* [Format](#format)

## <a name="intro"></a>Inroduction

This is the complete documentation for the REST API for IFS.
When designing new APIs, they should be added to this document in the format described at the end of this document.

(Thanks to iros for having a basic doc format to base this on: https://gist.github.com/iros/3426278)

### <a name="version"></a>API Version
0

### <a name="base"></a>Base URL
`<hostname>/api/<version>`

Example: `hig.no/ifs/api/0`

### <a name="id"></a>Client ID

`client_id=[string]`

Each user of the API gets a unique client ID to identify them.
This ID is generated and set as a Cookie called `client_id` by the server with the first request.
Note that some of the APIs (e.g. comment ratings, engagement) will use this ID to identify clients automaticcaly, that the API will not work properly without Cookies enabled, and that clearing the Cookie will identify the user as a new client.
This is a temporary solutuion until proper user authentication is implemented.
## <a name="api"></a>APIs

### <a name="get-lecture"></a>Get Lecture

Get a lecture.

#### URL

`/lectures/:lecture-id`


#### Method

GET


#### URL Parameters

##### Required

* `lecture-id=[integer]` ID of lecture to get.

#### Success Respones

##### Success

Code: 200

Content:
```
{
    "type": "object",
    "properties": {
        "id": {
            "description": "ID of lecture. Same as ID from parameter",
            "type": "integer"
        },
        "name": {
            "description": "Name of the lecture",
            "type": "string"
        },
        "courseId": {
            "description": "ID of course that the lecture is part of",
            "type": "integer"
        }
    }
}
```

#### Error Responses

##### Lecture Not Found

The `lecture-id` parameter provided was not found.

Code: 404

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```

### <a name="add-comment"></a>Add comment

Add a comment to a lecture.

#### URL

`/lectures/:lecture-id/comments`

#### Method

POST


#### URL Parameters

##### Required

* `lecture-id=[integer]` ID of lecture to add a new comment to.

#### Data Parameters

* `data=[string]` The comment to be added.

#### Success Responses

##### Success

Code: 200

Content:
```
{
    "type": "object",
    "properties": {
        "id": {
            "description": "The primary id for the added comment",
            "type": "number"
        }
    }
}
```

#### Error Responses

##### Lecture Not Found

The `lecture-id` parameter provided was not found.

Code: 404

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```

##### Invalid Data

The data parameters in the request were invalid.
See error message for details.

Code: 400

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```

### <a name="get-comments"></a>Get Comments

Get comments from a lecture.

#### URL

`/lectures/:lecture-id/comments`


#### Method

GET


#### URL Parameters

##### Required

* `lecture-id=[integer]` ID of lecture to retrieve comments for.

#### Success Responses

##### Success

Code: 200

Content:
```
{
    "type": "object",
    "properties": {
        "comments": {
            "description": "List of all comments",
            "type": "array",
            "items": {
                "description": "A comment",
                "type": "object",
                "properties": {
                    "id": {
                        "description": "ID of comment",
                        "type": "integer"
                    },
                    "content": {
                        "description": "Text content of comment",
                        "type": "string"
                    },
                    "rating": {
                        "description": "Rating from the current client. See 'Get Comment Rating' API",
                        "type": "integer"
                    },
                    "score": {
                        "description": "Total comment score. Difference between up-votes and down-votes.",
                        "type": "integer"
                    },
                    "submissionTime": {
                        "description": "Time point when comment was submitted in ISO format (ISO 8601)"
                        "type": "string"
                    }
                }
            }
        }
    }
}
```

### <a name="set-rating"></a>Set Comment Rating

Set the client's rating on a comment.

#### URL

`/lectures/:lecture-id/comments/:comment-id/rating`

#### Method

POST

#### URL Parameters

##### Required

* `lecture-id=[integer]` ID of lecture to rate a comment.
* `comment-id=[integer]` ID of comment to rate.

#### Data Parameters

##### Required

* `rating=[integer]` The number 1, 0 or -1 for up vote, no vote or down vote.

#### Success Responses

##### Success

Code: 200

#### Error Responses

##### Bad Request

Data parameters were bad.
See message for details.

Code: 400

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```

##### Resource Not Found

Lecture or comment was not found.
See message for details.

Code: 404

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Message detailing which resource could not be found and what you might do to fix the issue",
            "type": "string"
        }
    }
}
```

### <a name="get-rating"></a>Get Comment Rating

Get a client's comment rating.

#### URL

`/lectures/:lecture-id/comments/:comment-id/rating`

#### Method

GET

#### URL Parameters

##### Required

* `lecture-id=[integer]` ID of lecture.
* `comment-id=[integer]` ID of comment to retrieve its rating.

#### Success Responses

##### Success

Code: 200

Content:
```
{
    "type": "object",
    "properties": {
        "rating": {
            "description": "The rating (-1, 0 or 1)",
            "type": "number"
        }
    }
}
```

#### Error Responses

##### Resource Not Found

The lecture or comment was not found.
See error message for details.

Code: 404

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```

### <a name="add-engagement"></a>Add Engagement Update

Add an update to a student's engagement in the class.

#### URL

`/lectures/:lecture-id/engagements`

#### Method

POST

#### URL Parameters

##### Required

* `lecture-id=[integer]` ID of lecture the engagement is for.

#### Data Parameters

##### Required

* `challenge=[number]` The amount of challenge in range [0, 1].
* `interest=[number]` The amount of interest in range [0, 1].
* `time=[string]` UTC time point of engagement update in ISO format (ISO 8601).

#### Success Responses

##### Success

Code: 200

Content:
```
{
    "type": "object",
    "properties": {
        "id": {
            "description": "ID of the engagement update",
            "type": "integer"
        }
    }
}
```

#### Error Responses

##### Lecture Not Found

The lecture was not found.
See error message for details.

Code: 404

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```

##### Invalid or Missing Data

The data parameters were invalid or missing.
See error message for details.

Code: 400

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```

#### Notes

Students are identified by the `client_id` Cookie.


### <a name="get-engagements"></a>Get Engagements

Get a lectures engagements values

#### URL

`/lectures/:lecture-id/engagements`

#### Method

GET

#### URL Parameters

##### Required

* `lecture-id=[integer]` ID of lecture the engagement is for.

##### Optional

* `last=[boolean]` true or false. true shows only last entry for each student.

#### Success Responses

##### Success

Code: 200

Content:
```
{
	"description": "List of all engagements",
	"type": "array",
	"items": {
		"description": "One engagement point",
		"type": "object",
		"properties": {
			"id": {
				"description": "ID of engagement point",
				"type": "integer"
			},
			"userId": {
				"description": "ID of user",
				"type": "integer"
			},
			"interest": {
				"description": "The amount of interest in range [0, 1]",
				"type": "number"
			},
			 "challenge": {
				"description": "The amount of challenge in range [0, 1]",
				"type": "number"
			},
			"time": {
				"description": "Time point when engagement point was submitted in ISO format (ISO 8601)"
				"type": "string"
			}
		}
	}

}

```

#### Error Responses

##### Resource Not Found

The lecture was not found.
See error message for details.

Code: 404

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```

#### Notes

last are set by `/lectures/:lecture-id/engagements?last=true`

### <a name="login"></a>Login

Login as a lecturer

#### URL

`/auth/login`

#### Method

POST

#### Data Parameters

##### Required

* `email=[string]` Lectures registered email address.
* `password=[string]` Hashed password using SHA256.

#### Success Responses

##### Success

Code: 200

Content:
```
{
    "type": "boolean"
    "description": "Flag for success",
}
```

#### Error Responses

##### Wrong user credentials

Either the email or password or both was wrong.
See error message for details.

Code: 404

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```

### <a name="check-login"></a>Check Login

Check if the user is still logged id.

#### URL

`/auth/login`

#### Method

GET

#### Success Responses

##### Valid user token

The user is still logged in.

Code: 200

Content:
```
{
    "description": "Flag for success",
    "type": "boolean"
}
```

#### Error Responses

##### Invalid user token

The user is not logged in.

Code: 404

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```


### <a name="logout"></a>Logout

Logout user

#### URL

`/auth/logout`

#### Method

GET

#### Success Responses

##### Success

Logging out user.

Code: 200

Content:
```
{
    "description": "Flag for success",
    "type": "boolean"
}
```

#### Error Responses

##### Could not logout user

Code: 404

Content:
```
{
    "type": "object",
    "properties": {
        "message": {
            "description": "Error message",
            "type": "string"
        }
    }
}
```

## <a name="format"></a>Format

Any section can be omitted if they are not relevant.
All necessary information to succesfully implement a request and handle any errors should be present.
When adding a new API, also add it to the index.

### API Title

One-line description of API. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple)

Optionally a longer description of API here

#### URL

The URL structure without the root path

#### Method

The request type. Options are `GET`, `POST`, `DELETE` and `PUT`

#### URL Parameters

`type` can be integer, number, boolean (1/0 or true/false), or string.

##### Required

List of each required parameter name and type in the format `name=[type]`.
A description can follow.

##### Optional
List of each optional parameter name and type in the format `name=[type]`.
A description can follow.

#### Data Parameters

For post requests, describe the body payload. Rules from __URL Parameters__ apply here too.

#### Success Responses

##### Response Title

Code: The status code of the success.

Content: The structure of the content returned.
The JSON format is required.
Using [JSON-schema](http://json-schema.org/examples.html) is not a bad idea.

#### Error Responses

##### Response Title

Code: The status code of the error.

Content: The structure of the content returned.
The JSON format is required.
Using [JSON-schema](http://json-schema.org/examples.html) is not a bad idea.

#### Example Request

Example of a request that will actually work.

#### Notes
Any other comments, discussions, etc.
