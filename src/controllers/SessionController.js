const { UserModel } = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    const userModel = new UserModel()

    const user = await userModel.findByEmail(email)

    if (!user) {
      return res.status(401).send({ message: 'User not found' })
    }

    const comparedHash = await bcrypt.compare(password, user.password_hash)

    if (!comparedHash) {
      return res.status(401).send({ message: 'Incorrect password' })
    }

    return res.json({
      user,
      token: jwt.sign({ email: user.email }, process.env.APP_SECRET)
    })
  }
}

module.exports = new SessionController()