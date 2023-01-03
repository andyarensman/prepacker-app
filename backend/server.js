require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const closetRoutes = require('./routes/closet')
const checklistRoutes = require('./routes/checklist')
const userRoutes = require('./routes/user')
const cors = require('cors')


// express app
const app = express()

// middleware
// app.use(
//   cors({
//     origin: process.env.CORS_URL
//   })
// )
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  next()
})

// routes
app.use('/api/closet', closetRoutes)
app.use('/api/checklist', checklistRoutes)
app.use('/api/user', userRoutes)

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

