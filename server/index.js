// REQUIRE DEPENDENCIES
require('dotenv').config()
const { json } = require('body-parser')
const cors = require('cors')
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')

const PORT = process.env.PORT || 3005

const { CONNECTION_STRING, AUTH_DOMAIN, CLIENT_SECRET, CLIENT_ID, SESSION_SECRET } = process.env

const authController = require('./controllers/auth_controller')

// MAKE PORT AND APP
const app = express()

// USING BODY PARSER AND CORS
app.use(json())
app.use(cors())

// SETTING UP DATABASE CONNECTION
massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
}).catch(console.log)

// SETTING UP SESSION
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 525600 * 60 * 1000
  }
}))

// SETTING UP AUTH
app.use(passport.initialize())
app.use(passport.session())

// REQUIRING AUTH
passport.use(new Auth0Strategy({
  domain: AUTH_DOMAIN,
  clientSecret: CLIENT_SECRET,
  clientID: CLIENT_ID,
  callbackURL: 'http://localhost:3005/auth',
  scope: "openid profile user"
}, (acessToken, refreshToken, extraParams, profile, done) => {
  app.get('db')
  .getUserById(profile.id)
  .then(response => {
    if(!response[0]) {
      app.get('db')
      .createUserById([profile.id, profile.displayName])
      .then(created => {
        return done(null, created[0])
      })
    } 
    else {
      return done(null, response[0])
    }
  })
}))

// PASSPORT SERIALIZE AND DESERIALIZE
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

// SETTING UP AUTHENTICATION
app.get('/auth', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/home',
  failureRedirect: 'http://localhost:3000/'
}))

// REQUEST USER FROM DATABASE
app.get('/api/user/:id', authController.getDatabaseUser)

// REQUEST CHARACTER FROM DATABASE
app.get('/api/character/:id', authController.getCharacter)

// APP LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})