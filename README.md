
# Personal Goal Manager

> You can find the website hosting the app [here](http://personal-goal-manager-react.s3-website.eu-west-2.amazonaws.com/) 

> You can find the Documentation for the API [here](https://documenter.getpostman.com/view/12163449/TVRn36nm#intro) 

# Introduction

This application is a tool that will help you keep track of your goals. The aim of the project first of all was to use it
myself, but down the road I decided to add authentication and share with my friends trying to motivate them towards setting
goals and personal development. Also it was a very good opportunity for me to make use of my react knowledge in practical
way.

# Front-End

For the styling I didnt use any framework so I had to first **design the app** and then procceed to the implementation phase.

> The design is **responsive** and **mobile friendly**.

The front-end section is a **Single Page Application (SPA)** builded using the **React** library. 
Some of the packages used are mentioned below:

| Package | Description |
| ----------- | ----------- |
| React Router | In order to implemet the different Routes of the application |
| React Redux | I use Redux store for all the authentication information shared in the components|
| Redux Thunk | For dispatching asynchronous actions |
| Axios | For the http requests at the API |



# Back-End

For the back-end of my application I created **my own API** using nodeJS and the Express framework. You can find the Postman documentation for the API [here](https://documenter.getpostman.com/view/12163449/TVRn36nm#intro). Below we mention the different routes of the API:

| Type | Route |
| ----------- | ----------- |
| POST | /users/signup |
| POST | /users/login |
| POST | /categories |
| GET | /categories |
| DEL | /categories/:id |
| POST | /goals |
| GET | /goals |
| DEL | /goals/:id |
| PATCH | /goals/:id |

For the authentication we use a JSON  Web Token which is generated during the signup or the login of the user
and is used for the access at the protected routes.

The API is communicating with a **mongoDB database** hosted in the mongoDB Cloud (Atlas)


# DevOps

The application is hosted at the **Amazon Web Services (AWS)**

* The API is running in a **EC2 instance**
* The React app is hosted in an **S3 Bucket**

Also I use a **Buddy deployment pipeline** which I trigger manually when I push a new update at the master branch of the react-app.

# How to run it locally

1. Clone the repository.
2. Run npm install to both api and react-app folder.
3. At the axios-instance.js file change the baseURL of the API to http://localhost:3001
4. Provide the enviromental variables: 
  * MONGO_ATLAS_PSW which is the password for the mongodb Cloud databse.
  * JWT_KEY which is used for the contruction of the JWT.
  
5. Run the start-api.bat.
6. Run the start-react.bat.





