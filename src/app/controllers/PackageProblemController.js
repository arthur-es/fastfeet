import PackageProblem from '../models/PackageProblem';

class PackageProblemController {
  async index(req, res) {
    const { packageId } = req.params;
    if (!packageId)
      return res
        .status(400)
        .json({ error: 'You must provide a param of `packageId`' });

    const problems = await PackageProblem.findAll({
      where: {
        package_id: packageId,
      },
    });
    return res.json(problems);
  }

  async store(req, res) {
    const { packageId } = req.params;
    if (!packageId)
      return res
        .status(400)
        .json({ error: 'You must provide a param of `packageId`' });

    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const packageProblem = await PackageProblem.create({
      description,
      package_id: packageId,
    });

    return res.status(200).json(packageProblem);
  }
}

export default new PackageProblemController();
