# Mocktologist App
This app is part of the final stage of La Fosse Academy

## Mocktologist Backend Repo

### This backend repo serves the Mocktologist frontend Repo with the following endpoints: 

### User Endpoints 

| Enpoint        | Request       | functionality  | input param | 
| -------------- | ------------- | -------------- | ------------|
| /user/register | POST          | Creates a user | |
| /user/login    | POST          | Creates a token| |
| /user/logout   | DELETE        | Deletes a token| |
| /user/token    | GET           | Gets user details by token| token|
| /user/count/:id    | GET           | Returns number of completed drinks| id|
| /user/count/:id    | PATCH           | Updates user info| id|


### Drink Endpoints 
