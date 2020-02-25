import Deliveryman from '../models/Deliveryman';
import Package from '../models/Package';

class DeliverymanController {
  async index(req, res) {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: 'You must provide a param of `id`' });
    try {
      /*
       * Checks if this deliveryman id exists
       */
      const deliveryman = await Deliveryman.findByPk(id);

      if (!deliveryman) {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      const packages = await Package.findAll({
        where: {
          deliveryman_id: id,
          canceled_at: null,
          end_at: null,
        },
      });

      return res.json(packages);
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

export default new DeliverymanController();
