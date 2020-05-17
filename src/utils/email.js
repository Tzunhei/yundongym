import { setApiKey, send } from '@sendgrid/mail';

setApiKey(process.env.SENDGRID_API_KEY);

export const sendActivationEmail = async (to, activationToken) => {
  const activationEmail = {
    to,
    from: 'test@sendgrid.com',
    subject: 'activation email',
    html: `<a href="http://localhost:3000/activate/${activationToken}">Activate your account</a>`,
  };
  await send(activationEmail);
};
