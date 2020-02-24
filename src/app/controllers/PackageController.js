import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import Package from '../models/Package';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

let yupValidationErrors = [];

class PackageController {
  async store(req, res) {
    /*
      Checks if object sent from client is ok
    */
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number(),
      product: Yup.string().required(),
      start_date: Yup.string().required(),
      end_date: Yup.string(),
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
        error: 'Validation failed',
        errors: yupValidationErrors,
      });
    }

    const { recipient_id, deliveryman_id, product, start_date } = req.body;

    /**
     * Checks if recipient_id and deliveryman_id exists
     */
    const recipientFound = await Recipient.findByPk(recipient_id);
    if (!recipientFound) {
      return res.status(400).json({ error: 'recipient_id doest not exists' });
    }
    const deliverymanFound = await Deliveryman.findByPk(deliveryman_id);
    if (!deliverymanFound) {
      return res.status(400).json({ error: 'deliveryman_id doest not exists' });
    }

    const packageCreated = await Package.create({
      recipient_id,
      deliveryman_id,
      product,
      start_date: parseISO(start_date),
    });
    return res.json(packageCreated);
  }
}

export default new PackageController();
