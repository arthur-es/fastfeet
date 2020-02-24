import Mail from '../../lib/Mail';

class CancelPackageMail {
  get key() {
    return 'CancelPackageMail';
  }

  async handle({ data }) {
    const { packageData } = data;

    await Mail.sendMail({
      to: `${packageData.deliveryman.name} <${packageData.deliveryman.email}>`,
      subject: 'ENTREGA CANCELADA',
      template: 'cancelPackage',
      context: {
        deliveryman: packageData.deliveryman.name,
        recipient: packageData.recipient.name,
        product: packageData.product,
      },
    });
  }
}

export default new CancelPackageMail();
