
//Using mongoose
const mongoose = require('mongoose')

/* //using the debug module
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')

//using the config module
const config = require('config')

//using a third party middleware. more can be seen at express.com 
const morgan = require('morgan')
const helmet = require('helmet')

//custom middleware
const logger = require('./middleware/logger')
const auth = require('./middleware/auth')
 */

//load our routes
const genres = require('./routes/genres')
//const home = require('./routes/home')

const express = require('express')
const app = express()

//connect to mongoose DB
mongoose.connect('mongodb://127.0.0.1:27017/vidly')
  .then(() => console.log('Connected to mongoDB ..... '))
  .catch((err) => console.log('Could not connect this time ....', err))

/* //Using templating Engine and Setting it up
app.set('view engine', 'pug')
//Optional Setting for setting a default path
app.set('views', './views')

//working with enviroments
//this will return the enviroment for this node application.
//if this process.env.NODE_ENV is not set it will return undefined
console.log(`Node_Env: ${process.env.NODE_ENV}`)

//or we could use 
console.log(`app: ${app.get('env')}`) */

//Below are three default express middleware 
app.use(express.json())
/* 
app.use(express.urlencoded({extended: true}))
app.use(express.static('public')) */

//use our route
app.use('/api/genres', genres)
/* app.use('/', home)

//third party middleware
app.use(helmet()) */

//Configurations
/* console.log(`Application Name: ${config.get('name')}`)
console.log(`Mail Server: ${config.get('mail.host')}`)
console.log(`Password: ${config.get('mail.password')}`) */

//using morgan only in development enviroment
/* if(app.get('env') === 'development'){
  app.use(morgan('tiny'))
  //using debuger in place of console.log
  startupDebugger('Enabled Morgan....')
}

// DB work
dbDebugger('connected to the DB')

//creating a custom login midleware function
app.use(logger)

//creating a custom Authenticating midleware function
app.use(auth) */


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening at port ${port}`))