const mongoose = require('mongoose')
require('dotenv').config()

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log('Connected mongo'))
  .catch(console.error)
