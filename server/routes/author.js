const express = require('express')
const { author } = require('../controllers/author')

const router = express.Router()


// get author data using : GET /api/author/:id
router.get("/:id", author)


module.exports = router