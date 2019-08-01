if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}

const express = require('express')
const moment = require('moment')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')
const app = express()

const port = process.env.PORT

mongoose.connect(process.env.DB_NAME, {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    console.log(err), console.log(`Error connection to mongoose`)
  } else {
    console.log(`Success connect to mongoose`)
  }
})

app.use(cors())
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

app.use('/', router)

app.use(errHandler)

app.listen(port, () => {
  console.log(`Connection on port :${port} Success !!!`)
})

