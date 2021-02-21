const bcrypt = require('bcryptjs')

const { UserModel } = require('../../src/models/User')

describe('User', () => {
  it('should encrypt user password', async () => {

    const password = '123456'

    const userModel = new UserModel()

    const user = await userModel.create({
      email: 'fagner@gmail.com',
      name: 'Fagner',
      password
    })

    const comparedHash = await bcrypt.compare(password, user.password_hash)

    expect(comparedHash).toBe(true)
  })
})