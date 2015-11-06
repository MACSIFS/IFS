# API Documentation

## Index
* [Introduction](#intro)
    * [API Version](#version)
    * [Base URL](#base)
* [APIs](#api)
    * [Add Comment](#add-comment)
    * [Get Comments](#get-comments)
    * [Example API](#example)
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

## <a name="api"></a>APIs

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

#### Success Respones

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
                    }
                }
            }
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


### <a name="example"></a>Example API (not implemented)
Retrieve a sum of money.

Performs a transaction and returns the sum of money successfully retrieved.

#### URL

`/bank/retrieve/:sum`

#### Method

POST

#### URL Parameters

##### Required

* `sum=[number]` The sum that you want to retrieve.

#### Success Responses

##### Success

Code: 200

Content:
```
{
    "type": "object",
    "properties": {
        "sum": {
            "description": "The actual sum retrieved. Might be less than the requested.",
            "type": "number"
        }
    }
}
```

#### Error Responses

##### Bad Request

Code: 400

Content:
```
{
    "type": "object",
    "properties": {
        "error": {
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
