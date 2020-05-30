import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendActivationEmail = async (to, activationToken) => {
  const activationEmail = {
    to,
    from: 'test@sendgrid.com',
    subject: 'activation email',
    html: `<a href="http://localhost:3000/activate/${activationToken}">Activate your account</a>`,
  };
  await sgMail.send(activationEmail);
};

export const sendAccountActivatedEmail = async (to) => {
  const accountActivatedEmail = {
    to,
    from: 'test@sendgrid.com',
    subject: 'confirmation email',
    html:
      '<a href="http://localhost:3000/login">Your account is activated.</a>',
  };
  await sgMail.send(accountActivatedEmail);
};
