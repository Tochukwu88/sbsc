# sbsc
## Introduction
This is a simple demonstration of building an application with a microservice architecture, no real database was used, data are stored in a json file
## Tools
 - nodejs
 - Typescript
 - Docker/Docker-compose
 - kafka
 
 ## prerequisite
 - Make sure you have nodejs installed
 - Make sure you have Docker and Docker-compose running on your local machine
 
  ## How to use
  - clone the proeject
  - cd into auth directory, run npm install to install dependecies
  - cd into quote directory, run npm install to install dependecies
  - go to the root of the project and run  docker-compose up
  - use localhost:4000/api/v1/signup to signup, payload = {name:"name",email:"email",password:"password"}
  - use localhost:4000/api/v1/signin to signin,  payload = {email:"email",password:"password"}
  - use localhost:4005/api/v1/quotes to get random quotes
  - You must have been logged it and received an access token which you will pass in the headers when requesting for a quote (bearer {token})
  
  ## Improvements
  - A real database should be used instead of a json file
  - kubernetes can be used to manage different containers, communication between coontainers and also the outside world
