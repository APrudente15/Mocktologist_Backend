# Mocktologist App
This app is part of the final stage of La Fosse Academy

## Mocktologist Backend Repo

### This backend repo serves the Mocktologist frontend Repo with the following endpoints: 

### User Endpoints 

| Endpoint       | Request Type  | functionality                     | input params|  req body     | 
| -------------- | ------------- | --------------------------------- | ------------| --------------|
| /user/register | POST          | Creates a user                    |             |{fname, lname, email, password, vegan, image=null}|
| /user/login    | POST          | Creates a token                   |email & pass |{email, password}                                 |
| /user/logout   | DELETE        | Deletes a token                   |             |               |
| /user/token    | GET           | Gets user details by token        | token       |               |
| /user/count/:id| GET           | Returns number of completed drinks| id          |               |
| /user/:id      | PATCH         | Updates user info                 | id          |{fname, lname, email, vegan, image=null}          |


### Drink Endpoints 

| Endpoint          | Request Type  | functionality                    | input params    |   req body     | 
| ------------------| ------------- | -------------------------------- | ----------------|----------------|
| /drink/accept     | POST          | Posts drink to database          |                 |                |
| /drink/:id        | DELETE        | Abandons accepted drink          | id              |                |
| /drink            | GET           | Generates a new drink            |                 |                |
| /drink/all/:id    | GET           | Gets all completed drinks of user| id              |                |
| /drink/current/:id| GET           | Gets the current drink of user   | id              |                |
| /drink/top/:id    | GET           | Gets top rated drink of user     | id              |                |
| /drink/rate/:id   | PATCH         | Changes rating of drink          | id              |                |
| /drink/picture/:id| PATCH         | Changes picture of drink         | id              |                |
