import PackageProblem from '../models/PackageProblem';

class PackageProblemsDistributorController {
  async index(req, res) {
    const problems = await PackageProblem.findAll();
    return res.json(problems);
  }
}

export default new PackageProblemsDistributorController();
