import jwt from 'jsonwebtoken'
import User from '../models/User'

import authConfig from '../../config/auth'

class SessionController {
  async store(req, res) {
    console.log("Session controller")
    const { email, password } = req.body;
    const userExistis = await User.findOne({ where: { email } })
    if (!userExistis) {
      return res.status(404).json({ error: 'User not found!' })
    }

    if (!(await userExistis.checkPassword(password))) {
      return res.status(401).json({ error: 'Password doesnt not match!' })
    }

    const { id, name } = userExistis;

    return res.status(200).json({
      user: {
        id, name, email
      }, token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })

  }
}

export default new SessionController();