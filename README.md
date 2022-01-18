# Shopify-backend-challenge
Project link: https://shopify-sibo.herokuapp.com/ (I have already added some items in the database to help you testing)

## Features

 -  **Create** inventory items
 - **Update** created items
 - **Delete** created items
 - **View** a list of created items (with pagination implemented)
 - Extra feature:  **Filtering** based on metadata of items
## Backend Structure
To make the project to be extendable as mentioned in the requirement, I split the main backend logic into three folders, /controllers, /models, and /services
In short:
 - /models: is for the definition of tables
 - /services: is for methods to perform operations with one or more models
 - /controllers: is where we write business logic to use the methods that provided in the services folder

## Getting Started

If you wish to test the project locally

###  Prerequisites

 - [Node](https://nodejs.org/en/download/) installed
 - For the database, you can use the one already deployed by me, or you can setup your own [postgreSQL](https://www.postgresql.org/download/)

### Installation

Clone the project
 

    git clone https://github.com/SiboYang/Shopify-backend-challenge.git

**Backend**

 - `cd backend`
 - Create a file called **.env** in the backend root and copy the contents of **.sample-env** in it. Then put `postgres://qgccqomrnipblp:164338191e8c73d71ad0bfb384ab285fcda1226a886e757040eb2e91c1be70b3@ec2-3-216-113-109.compute-1.amazonaws.com:5432/dbdfa76v23vd7l` as the value for DATABASE_URL. Or, you can create you own postgreSQL database and put the corresponding URL as the value. (Note: the URL I provide may change, in this case, you can send me and email sibo.yang@mail.mcgill.ca)
 - `yarn` to install dependencies
 - `yarn start` to have backend running on port 8080

**Frontend** (I use **npm** for frontend because create-react-app are currently having a new issue happened 4 days ago with **yarn**)

 - `cd frontend`
 - go to frontend/src/axios.js, on line 2, change the baseURL to "http://localhost:8080/"
 - `npm install` to install dependencies
 - `npm start` , then you can access the project on any browser with the url http://localhost:3000/

    

