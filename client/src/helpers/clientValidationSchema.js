import * as Yup from 'yup';
import parseDateString from './dateParser';

const ClientSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  middleNames: Yup.string()
    .min(2, 'Too Short!')
    .max(200, 'Too Long!'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  birthdate: Yup.date()
    .transform(parseDateString)
    .max(new Date(), 'DOB Cannot be later than the current date')
    .min(new Date(1900, 0), 'Nobody is that old...')
    .required('Required'),
  addressLineOne: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!'),
  addressLineTwo: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!'),
  addressLineThree: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!'),
  city: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!'),
  country: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!'),
  postCode: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .matches(/^\S+ ?\S+$/, 'Enter a valid Post Code'),
});

export default ClientSchema;