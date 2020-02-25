import Mail from '../../lib/Mail';

class NewPackageMail {
  get key() {
    return 'NewPackageMail';
  }

  async handle({ data }) {
    const { packageData } = data;

    await Mail.sendMail({
      to: `${packageData.deliveryman.name} <${packageData.deliveryman.email}>`,
      subject: 'NOVA ENTREGA CADASTRADA',
      template: 'newPackage',
      context: {
        deliveryman: packageData.deliveryman.name,
        recipient: packageData.recipient.name,
        product: packageData.product,
      },
    });
  }
}

export default new NewPackageMail();
