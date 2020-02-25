import Deliveryman from '../models/Deliveryman';
import Package from '../models/Package';
import { parseISO } from 'date-fns';

class DeliverymanController {
  async update(req, res) {
    const { end_date } = req.body;
    if (!end_date)
      return res.status(400).json({ error: 'You must provide a end_date' });

    const { id, packageId } = req.params;
    if (!id)
      return res.status(400).json({
        error: 'You must provide a param of `id` for the deliveryman',
      });
    if (!packageId)
      return res
        .status(400)
        .json({ error: 'You must provide a param of `id` for the package' });
    try {
      /*
       * Checks if this deliveryman id exists
       */
      const deliveryman = await Deliveryman.findByPk(id);

      if (!deliveryman) {
        return res.status(400).json({ error: 'Invalid ID for deliveryman' });
      }
      /*
       * Checks if this package id exists
       */
      const packageFound = await Package.findByPk(packageId);
      if (!packageFound) {
        return res.status(400).json({ error: 'Invalid ID for package' });
      }
      /*
       * Checks if this package belongs to this deliveryman
       */

      const { deliveryman_id } = packageFound;
      if (deliveryman_id != deliveryman.id) {
        return res.json({
          error: 'This package does not belong to this deliveryman',
        });
      }

      const updatedPackage = await packageFound.update({
        end_date: parseISO(end_date),
      });

      return res.json(updatedPackage);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}

export default new DeliverymanController();
