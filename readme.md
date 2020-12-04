# express-apollo-mysql Boilerplate

A very neat setup that utilize the power of both **MySQL** and **GraphQL**.

## Essential Libraries that make this build efficient and well structured

- apollo-server-express 
- @graphql-modules/core
- esm
- knex
- objectionjs
- mysql2
- momentjs 

## Commands to start
 ```
git clone 
cd folder
npm install
npx knex init
touch .env
```

> **Note** Modify the .env and add the following lines

```
NODE_ENV=development 

PORT=5052  

DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_DATABASE=db_name
DB_PORT=3306 
```

After this, Fire up the application and see if everything works as it should


# Additional Commands to help you 
Please refer to this documentation to start with database migrations and seeds
- [Knex JS](http://knexjs.org/)
- [ObjectionJS](https://vincit.github.io/objection.js/)

Additional commands that will help you kick start
- Migrate and install seeds

&emsp;&emsp;&emsp;&emsp;```npm run migrate:seed```
- Refresh Migration

&emsp;&emsp;&emsp;&emsp;```npm run migrate:refresh ```
- Migrate to latest

&emsp;&emsp;&emsp;&emsp;``` npm run migrate ```
- Migrate Rollback

&emsp;&emsp;&emsp;&emsp;``` npm run rollback```

  