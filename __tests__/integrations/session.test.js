const request = require('supertest')

const { UserModel } = require('../../src/models/User')

const app = require('../../src/app')

describe('Authentication', () => {
  it('should authenticate with valid credentials', async () => {

    const userModel = new UserModel()

    const user = await userModel.create({
      name: 'fagner',
      email: 'fagnerzin@gmail.com',
      password: 'should_work'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'should_work'
      })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with unvalid credentials', async () => {
    const userModel = new UserModel()

    const user = await userModel.create({
      name: 'fagner',
      email: 'fagnerzin@gmail.com',
      password: 'shoud_not_work'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'shoud_not_work-asdasdsa'
      })

    expect(response.status).toBe(401)
  })

  it('should receive JWT token when authenticated', async () => {
    const userModel = new UserModel()
    const user = await userModel.create({
      name: 'fagner',
      email: 'fagnerzin@gmail.com',
      password: 'should_work'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'should_work'
      })

    expect(response.body).toHaveProperty('token')
  })
})