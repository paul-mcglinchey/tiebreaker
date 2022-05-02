import * as Yup from 'yup';

const permissionValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .max(100, 'Too Long!'),
  language: Yup.string()
    .required('Required')
});

export default permissionValidationSchema;