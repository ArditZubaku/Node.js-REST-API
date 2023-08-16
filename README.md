
# REST API

A simple REST API with Node.js, the Express framework and MongoDB.

## Prerequisites

Before even starting, make sure you have Node.js installed in your machine. I have used the latest 20.5.0 version, but the LTS version will work too.

Use this link for the official site: https://nodejs.org/en

## Clone the app

Clone the app via https or SSH

```bash
  git clone https://github.com/ArditZubaku/NodeJS_Task.git
```
or

```bash
  git@github.com:ArditZubaku/NodeJS_Task.git
```

## Installation

To install the needed packages using npm or yarn, first navigate to the project

```bash
  cd NodeJS_Task
```

then, inside it execute

```bash
  npm install
```

## Running the app

First set the .env variables, if you are using UNIX systems via terminal execute:

```bash
  mv env.example .env
```
or create a new .env file yourself.

To generate a quick JWT_SECRET, in terminal execute this command:

```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

After setting the .env variables, run the app by executing:

```bash
  npm run start
```

or in dev mode

```bash
  npm run start:dev
```

## Testing the routes

Depending on what editor or IDE you are using (I have used WebStorm), I have prepared a .http file where you can test all the routes of the app.

Note: If you are using VSCode, make sure you have already installed the REST Client extension and uncomment the first line:
```bash 
#@host = http://localhost:3000 
```

