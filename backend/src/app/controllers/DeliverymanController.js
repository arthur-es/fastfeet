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
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: 'You must provide a param of `id`' });

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
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

    const deliveryMan = await Deliveryman.findByPk(id);

    const updatedDeliveryman = await deliveryMan.update(req.body);

    return res.json(updatedDeliveryman);
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: 'You must provide a param of `id`' });

    const deliveryMan = await Deliveryman.findByPk(id);
    if (!deliveryMan) {
      return res
        .status(400)
        .json({ error: `Unable to find a deliveryman with id of ${id}` });
    }

    await deliveryMan.destroy();

    return res.json(deliveryMan);
  }
}

export default new DeliverymanController();
