import * as Yup from 'yup';

const permissionValidationSchema = Yup.object().shape({
  identifier: Yup.number()
    .min(0, 'Cannot be less than 0')
    .required('Required'),
  name: Yup.string()
    .min(4, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .max(1000, 'Too Long!')
    .required('Required'),
  language: Yup.string()
    .required('Required')
});

export default permissionValidationSchema;