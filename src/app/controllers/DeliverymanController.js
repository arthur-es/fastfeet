import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

let yupValidationErrors = [];

class DeliverymanController {
  async index(req, res) {
    try {
      const deliverymen = await Deliveryman.findAll();
      return res.json(deliverymen);
    } catch (err) {
      return res.json({ error: err });
    }
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.number(),
    });

    const validationResult = await schema
      .validate(req.body, {
        abortEarly: false,
      })
      .catch(err => {
        yupValidationErrors = err.errors;
      });

    if (!validationResult) {
      return res.status(400).json({
        error: 'Yup validation failed',
        errors: yupValidationErrors,
      });
    }

    const deliveryManCreated = await Deliveryman.create(req.body);

    return res.json(deliveryManCreated);
  }
  async update(req, res) {
    return res.json({ ok: 'ko' });
  }

  async delete(req, res) {
    return res.json({ ok: 'ko' });
  }
}

export default new DeliverymanController();
