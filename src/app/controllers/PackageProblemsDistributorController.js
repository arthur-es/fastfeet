import PackageProblem from '../models/PackageProblem';
import Package from '../models/Package';

class PackageProblemsDistributorController {
  async index(req, res) {
    const problems = await PackageProblem.findAll();
    return res.json(problems);
  }

  async delete(req, res) {
    const { packageProblemId } = req.params;
    if (!packageProblemId)
      return res
        .status(400)
        .json({ error: 'You must provide a param of `id`' });

    const packageProblemFound = await PackageProblem.findByPk(packageProblemId);
    if (!packageProblemFound) {
      return res.status(400).json({
        error: `Unable to find a problem with id of ${packageProblemId}`,
      });
    }

    const { package_id } = packageProblemFound;

    const packageFound = await Package.findByPk(package_id);

    if (!packageFound)
      return res.status(400).json({
        error:
          'We were unable to find a package with the id of the package problem',
      });

    const packageCanceled = await packageFound.update({
      canceled_at: new Date(),
    });

    //TO-DO: Quando uma encomenda for cancelada, o entregador deve receber um e-mail informando-o sobre o cancelamento.

    return res.json(packageCanceled);
  }
}

export default new PackageProblemsDistributorController();
