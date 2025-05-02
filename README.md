# NC News

## About this project
[Hosted Version: ](https://ells-s-nc-news.onrender.com) https://ells-s-nc-news.onrender.com

### Project overview
- This project is a backend API which has been designed to emulate the backend of a news website. It is built using **Node.js**, **Express** and **PostgreSQL** and provides programmatic access to a relational database containing four tables: topics, users, articles and comments. The API supports various operations including retrieving, creating, updating and deleting data, along with querying capabilities such as sorting, ordering and filtering. 

## Setup instructions
### 1. Clone the repository
- Clone the project to your local machine using the following command:
`git clone https://github.com/ells-s/seeding-nc-news.git`

### 2. Install dependencies
- Run the following command to install required packages:
`npm install`

### 3. Set up environment variables
#### How to set up env files:
- As .env.* files are ignored by Git, anyone who clones this project will need to manually set up the environment variables for local development.

##### Create .env files:
- Create two .env files.
- One should be named .env.development (for the development database).
- The other should be named .env.test (for the test database).

##### Add values to .env files:
- In the .env.development file, assign PGDATABASE to the name of the development database.
- In the .env.test file, assign PGDATABASE to the name of the test database.

### 4. Set up the database
- To set up the database run the following command:
`npm run setup-dbs`

- To seed the database run the following command:
`npm run seed-dev`

### Run tests
- This project uses Jest for testing. To run tests use the following command:
`npm test`

### Minimum versions
- **Node.js** (tested on v23.9.0).
- **PostgreSQL** (developed and tested with v14.17).