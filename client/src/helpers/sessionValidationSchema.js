import * as Yup from 'yup';
import parseDateString from './dateParser';

const SessionSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(10, 'Too Short!')
    .max(500, 'Too Long!'),
  notes: Yup.array(),
  date: Yup.date()
    .transform(parseDateString)
    .max(new Date(), 'Cannot be later than the current date')
    .min(new Date(1900, 0), 'Too Long Ago')
    .required('Required')
})

export default SessionSchema;