# Northcoders News API


https://yls-news.onrender.com/

This website is a news aggregation site where users can currently interact with articles by commenting and voting on them.

By navigating to https://yls-news.onrender.com/api you can get a document listing all the available endpoints and their functionalty.

This database can be cloned from the repo:
https://github.com/Siffster85/yls_news.git

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names).

You will need to run the below commands before you start:

npm install
npm run setup-dbs

These will install the required dependancies and the database.

To seed the development database run:

npm run seed

To run the tests use the below command, this will also seed the test database.

npm test

After the first run if everything is successful you can just use the below to test the functionality as long as you make no changes to the utils.

npm test index

Finally you will also need Node.js and Postgres install, I'd recommend the latest versions of both
Minimum version:

Node.js >=v18
Postgres >=2.2.0