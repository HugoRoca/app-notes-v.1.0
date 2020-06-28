/* eslint-disable camelcase */
const User = require('../models/User')

module.exports = class {
  async signUp (req, res) {
    const { name, email, password, confirm_password } = req.body
    const errors = []

    if (!name || !email) errors.push({ text: 'Please complete all fields' })
    if (password !== confirm_password) { errors.push({ text: 'Password do not match' }) }
    if (password.length < 4) { errors.push({ text: 'Password must be at least 4 characters' }) }
    if (errors.length > 0) {
      res.render('users/signup', {
        errors,
        name,
        email,
        password,
        confirm_password
      })
    } else {
      const emailUser = await User.findOne({ email })
      if (emailUser) {
        req.flash('error_msg', 'The email is already exists')
        res.redirect('/users/signup')
      }
      const newUser = new User({ name, email, password })
      newUser.password = await newUser.encryptPassword(password)
      await newUser.save()
      req.flash('success_msg', 'You are register')
      res.redirect('/users/signin')
    }
  }

  async logout (req, res) {
    req.logOut()
    res.redirect('/')
  }

  async renderSignin (req, res) {
    res.render('users/signin')
  }

  async renderSignup (req, res) {
    res.render('users/signup')
  }
}
