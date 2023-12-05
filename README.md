# Walknjoy API Documentation

## Introduction

The Walknjoy API allows you to manage products in a simple and efficient manner.

## Getting Started

To get started, obtain an API key by signing up on our [developer portal](https://walknjoy.com/doc). Include the API key in the header of your requests.

Base URL: https://walknjoy.com/api

### Authentication

To authenticate with the Walknjoy API, send a `POST` request to the `/auth/register` endpoint with your credentials.

**Request:**
```http
POST https://walknjoy.com/api/auth/register
Content-Type: application/form-data
```

To login Walknjoy API, send a `POST` request to the `/auth/login` endpoint with your credentials.

**Request:**
```http
POST https://walknjoy.com/api/auth/login
Content-Type: application/json

{
    "username": "your-username",
    "password": "your-password"
}
```

To logout Walknjoy API, send a `POST` request to the `/auth/logout` endpoint.

**Request:**
``` http
POST https://walknjoy.com/api/auth/logout
```
To forgot-password Walknjoy API, send a `POST` request to the `/auth/forgot-password` endpoint

**Request:**
```http
POST https://walknjoy.com/api/auth/forgot-password
Content-Type: application/json

{
    "email":"your-email"
}
```

To subscribe Walknjoy API, send a `POST` request to the `/auth/subscribe` endpoint

**Request:**
```http
POST https://walknjoy.com/api/auth/subscribe
Content-Type: application/json

{
        "email":"your-email"
}
```
To reset-password Walknjoy API, send a `POST` request to the `/auth/user/reset-password` endpoint

**Request:**
```http
POST https://walknjoy.com/api/auth/user/reset-password
Content-Type: application/json

{
      "password":"your-password"
      "confirm-password":"confirm-your-password"
}
```

### Verify

To verify your tokens that sent by the Walknjoy API via email, send a `GET` request to the 
| Endpoint | Verify |
| ---------|----------|
| `/verify/:userID/:tokenID` | Verify email to register |
| `verify/sub/:userID/:tokenID` |Verify email to subscribe |
|`verify/reset-password/:userID/:tokenID`  | Verify email to reset-password |


### Users APIs

To update your own account send the `PUT` request to the `/users/user/update` endpoint with the your credentials.

**Request:**
```http
PUT https://walknjoy.com/api/users/user/update
Content-Type: application/json

{
    "username": "your-username",
    "country": "your-country",
    "city":"your-city",
    "phone":"your-phone",
}
```

To update your own profile photo send the `PUT` request to the `/users/user/update/profile-photo` endpoint with the your credentials.

**Request:**
```http
GET https://walknjoy.com/api/users/user/update/profile-photo
Content-Type: application/form-data
```

To get your profile details send `GET` request `/user/profile` to the endpoint.

To get your favourites send `GET` request to the `/users/user/favorites`.

To add favourite item to your favourite box send `POST` request to the `/users/user/favorites/:id`.

ID is your item id.


### Hotels

To get all hotels with the Walknjoy API, send a `GET` request to the `/hotels`.

To get a spesific hotel with the Walknjoy API, send a `GET` request to the `/hotels/find/:id`.

To get count of hotels by city with the Walknjoy API, send a `GET` request to the `/hotels/countByCity`.

To get rooms of hotel by city with the Walknjoy API, send a `GET` request to the `/hotels/room/:id`.


### Rooms

To get all rooms with the Walknjoy API, send a `GET` request to the `/rooms`.

To get a spesific room with the Walknjoy API, send a `GET` request to the `/rooms/find/:id`.


### Tours

To get all tours with the Walknjoy API, send a `GET` request to the `/tours`.

To get a spesific tour with the Walknjoy API, send a `GET` request to the `/tours/find/:id`.

To get count of tours by category with the Walknjoy API, send a `GET` request to the `/tours/countByCategory`.

To get count of tours by city with the Walknjoy API, send a `GET` request to the `/tours/countByCity`.

To get all tours by company name with the Walknjoy API, send a `GET` request to the `/tours/:id`.

ID is rental company id.


### Tour companies

To get all tour companies with the Walknjoy API, send a `GET` request to the `/tour-companies`.

To get a spesific tour company with the Walknjoy API, send a `GET` request to the `/tour-companies/find/:id`.


### Rental cars

To get all rental cars with the Walknjoy API, send a `GET` request to the `/rental-car`.

To get a spesific rental car with the Walknjoy API, send a `GET` request to the `/rental-car/find/:id`.

To get count of cars by city with the Walknjoy API, send a `GET` request to the `/tours/countByCity`.

To get all cars by rental with the Walknjoy API, send a `GET` request to the `/rental-car/car/:id`.

ID is rental company id.


### Cars

To get all cars with the Walknjoy API, send a `GET` request to the `/cars`.

To get a spesific car with the Walknjoy API, send a `GET` request to the `/cars/find/:id`.


### Entertainments

To get all entertainments with the Walknjoy API, send a `GET` request to the `/entertainments`.

To get a spesific entertainment with the Walknjoy API, send a `GET` request to the `/entertainments/find/:id`.

To get count of entertainments by city with the Walknjoy API, send a `GET` request to the `/entertainments/countByCity`.






