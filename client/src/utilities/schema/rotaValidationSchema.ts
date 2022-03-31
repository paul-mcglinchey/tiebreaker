import * as Yup from 'yup';

const rotaValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .min(2, 'Too short!')
    .max(50, 'Too long!'),
  startDay: Yup.string()
    .required('Required'),
});

export default rotaValidationSchema;