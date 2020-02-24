import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import Package from '../models/Package';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

let yupValidationErrors = [];

class PackageController {
  async index(req, res) {
    try {
      const packagesFound = await Package.findAll();
      return res.json(packagesFound);
    } catch (err) {
      return res.json({ error: err });
    }
  }

  async store(req, res) {
    /*
      Checks if object sent from client is ok
    */
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number(),
      product: Yup.string().required(),
      start_date: Yup.string(),
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
    });
    return res.json(packageCreated);
  }

  async update(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        error: 'You must provide a param of `id` to update the package',
      });
    /*
      Checks if object sent from client is ok
    */
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string(),
      start_date: Yup.string(),
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

    const packageFound = await Package.findByPk(id);

    const { recipient_id, deliveryman_id, product } = req.body;

    const updatedPackage = await packageFound.update({
      recipient_id,
      deliveryman_id,
      product,
    });

    return res.json(updatedPackage);
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: 'You must provide a param of `id`' });

    const packageFound = await Package.findByPk(id);
    if (!packageFound) {
      return res
        .status(400)
        .json({ error: `Unable to find a package with id of ${id}` });
    }
    const { product } = packageFound;
    await packageFound.destroy();

    return res.json({ id, product });
  }
}

export default new PackageController();
