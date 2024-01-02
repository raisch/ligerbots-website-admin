# Ligerbots Admin Website

## Requirements:
- NodeJS 10.x.x or greater
- Mongodb

## Create .env file
Create a server/.env file to store your credentials, such as:
```bash
# set location of mongodb and the database to use.
MONGODB_URI="mongodb://localhost/ligerbots-admin"

# set the port to run the server on.
PORT="3000"

# set the environment to run the server in.
NODE_ENV="development" # change to "production" for production

# Express session key
SECRET_KEY="[[CHANGE ME]]" # like L1g3rB0tsF0rTh3W1n

# JWT Secret - run `node -p "require('crypto').randomBytes(35).toString('hex')"` to generate.
JWT_SECRET="[[CHANGE ME TO 35 RANDOM BYTES IN HEX]]"
```

## Installation
To install and run this project
1. install yarn using `npm install -g yarn`.
1. install service dependencies using `yarn`.
1. run `./bin/prime-admin-account` to add admin user to db.
1. start your server using `yarn start`.

Then browse to: `http://localhost:3000` and log in using 
- username: `admin`
- password: `bongobongo`
