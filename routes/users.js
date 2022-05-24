const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('users/new', { user: new User() })
})

router.get('/edit/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.render('users/edit', { user: user })
})

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user == null) res.redirect('/')
  res.render('users/show', { user: user })
})

router.post('/', async (req, res, next) => {
  req.user = new User()
  next()
}, saveUserAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.user = await User.findById(req.params.id)
  next()
}, saveUserAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveUserAndRedirect(path) {
  return async (req, res) => {
    let user = req.user
    user.fName = req.body.fName
    user.email = req.body.email
    user.phone = req.body.phone
    user.country = req.body.country
    user.city = req.body.city

    try {
      user = await user.save()
      res.redirect(`/users/${user.id}`)
    } catch (e) {
      res.render(`users/${path}`, { user: user })
    }
  }
}

module.exports = router