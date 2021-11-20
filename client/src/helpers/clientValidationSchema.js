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
  email: Yup.string().email('Invalid email').required('Required'),
  birthdate: Yup.date().transform(parseDateString).max(new Date(), 'DOB Cannot be later than the current date').min(new Date(1900, 0), 'Nobody is that old...').required('Required'),
});

export default ClientSchema;