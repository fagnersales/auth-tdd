require('dotenv').config()

const { firestore } = require('../firebase')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserModel {
  async create({ name, email, password }) {
    const usersCollection = firestore.collection('users')

    const password_hash = await bcrypt.hash(password, 8)

    await usersCollection.doc(email).set({
      name, email, password_hash
    })

    const user = { name, email, password_hash }

    this.user = user

    return user
  }

  async findByEmail(email) {
    const usersCollection = firestore.collection('users')

    const document = await usersCollection.doc(email).get()

    return document ? document.data() : null
  }

}

module.exports = { UserModel }