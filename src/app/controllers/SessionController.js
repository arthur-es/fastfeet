import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'You have to provide an email and a password' });
    }
    const userExistis = await User.findOne({ where: { email } });
    if (!userExistis) {
      return res.status(404).json({ error: 'User not found!' });
    }

    if (!(await userExistis.checkPassword(password))) {
      return res.status(401).json({ error: 'Wrong password!' });
    }

    const { id, name } = userExistis;

    return res.status(200).json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
