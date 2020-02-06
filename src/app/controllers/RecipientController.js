import * as Yup from 'yup';

import Recipient from '../models/Recipient'

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complementary_info: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      postal_code: Yup.string().required(),
      email: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Yup validation failed' })
    }

    const { email } = req.body;

    const recipient = await Recipient.create(req.body)
    const { name, street, number, complementary_info, state, city, postal_code } = recipient;

    return res.status(200).json({
      name, email, street, number, complementary_info, state, city, postal_code
    })

  }

}

export default new RecipientController();