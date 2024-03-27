# Mocktologist Backend

This repo is the source code for the backend of Mocktologist. Please go to https://mocktologist-backend.onrender.com for the deployed version.

## Instructions for Local Use

1. Run `npm install` in `/`.
2. Create a new file named `.env` in `/`.
3. Add the following keys:
- `OPENAI_API_KEY` - The API key of the OpenAI account you want to use.
- `PORT` - The port you want to run the API on.
4. Run `npm run start` in `/`.

### User Endpoints 

| Endpoint       | Request Type  | functionality                     | input params|  req body                                        | 
| -------------- | ------------- | --------------------------------- | ------------| -------------------------------------------------|
| /user/register | POST          | Creates a user                    |             |{fname, lname, email, password, vegan, image=null}|
| /user/login    | POST          | Creates a token                   |             |{email, password}                                 |
| /user/logout   | DELETE        | Deletes a token                   |             |                                                  |
| /user/token    | GET           | Gets user details by token        | token       |                                                  |
| /user/count/:id| GET           | Returns number of completed drinks| user id     |                                                  |
| /user/:id      | PATCH         | Updates user info                 | user id     |{fname, lname, email, vegan, image=null}          |


### Drink Endpoints 

| Endpoint           | Request Type  | functionality                    | input params    |   req body                                                           | 
| -------------------| ------------- | -------------------------------- | ----------------|----------------------------------------------------------------------|
| /drink/accept      | POST          | Posts drink to database          |                 |{user, name, body, tastes, done=false, vegan, rating=null, image=null}|
| /drink/:id         | DELETE        | Abandons accepted drink          | drink id        |                                                                      |
| /drink             | GET           | Generates a new drink            |                 |                                                                      |
| /drink/all/:id     | GET           | Gets all completed drinks of user| user id         |                                                                      |
| /drink/current/:id | GET           | Gets the current drink of user   | user id         |                                                                      |
| /drink/top/:id     | GET           | Gets top rated drink of user     | user id         |                                                                      |
| /drink/rate/:id    | PATCH         | Changes rating of drink          | drink id        |{rating}                                                              |
| /drink/image/:id   | PATCH         | Changes picture of drink         | drink id        |{image}                                                               |
| /drink/complete/:id| PATCH         | Completes current drink          | user id         |                                                                      |
