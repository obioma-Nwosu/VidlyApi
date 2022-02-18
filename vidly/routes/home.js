const express = require('express')
const router = express.Router()

//using pug (Template Engine)
router.get('/', (req, res) => {
  // 1st Arg -> index because it is the name of our pug index.pug
  // 2nd Arg -> object containing values set in our pug
  res.render('index')
})

module.exports = router