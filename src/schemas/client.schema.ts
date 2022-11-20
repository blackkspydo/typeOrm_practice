import * as Yup from 'yup';

export const clientSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  cardNumber: Yup.string().length(10).required(),
  balance: Yup.number().required(),
  isActive: Yup.boolean(),
  currencies: Yup.array().of(Yup.string()).required()
});
