const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectToMongo = require('./db')
const authRouter = require('./routes/auth')
const authorsRouter = require('./routes/author')
const blogRouter = require('./routes/blog')

const app = express()
const port = process.env.PORT || 5001

// config
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true})); // To receive image
app.use("/assets", express.static(__dirname + "/public/assets")) // To serve static files from a directory named "public/assets

// Connect to mongo db
connectToMongo()

// Routes
app.use('/api/auth', authRouter)
app.use('/api/author', authorsRouter)
app.use('/api/blog', blogRouter)

// start server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})