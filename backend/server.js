require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const closetRoutes = require('./routes/closet')
const checklistRoutes = require('./routes/checklist')


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/closet', closetRoutes)
app.use('/api/checklist', checklistRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

