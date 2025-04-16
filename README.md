# NC News Seeding

- As .env.* files are ignored by Git, anyone who clones this project will need to manually set up the environment variables for local development.

## HOW TO SET UP ENV FILES:

### Create .env Files.
- create two .env files.
- one should be called .env.development (for the development database)
- the other should be called .env.test (for the test database)

### Add values to .env Files.
- in the .env.development file assign PGDATABASE to the name of the development database.
- in the .env.test file assign PGDATABASE to the name of the test database.
