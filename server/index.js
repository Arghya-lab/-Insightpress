const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectToMongo = require('./db')
const authRouter = require('./routes/auth')

const app = express()
const port = process.env.PORT || 5001

// config
app.use(cors())
app.use(express.json());

// Connect to mmongo db
connectToMongo()

// Routes
app.use('/api/auth', authRouter)
// app.use('/api/author', authorsRouter)
// app.use('/api/blogs', blogtsRouter)

// start server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})