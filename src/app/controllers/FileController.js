import File from '../models/File';

class FileController {
  async store(req, res) {
    if (!req.file) {
      return res.status(400).json({
        error:
          'You must provide an image file with the name property of `file` ',
      });
    }
    const { originalname: name, filename: path } = req.file;

    try {
      const file = await File.create({ name, path });
      return res.json(file);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new FileController();
