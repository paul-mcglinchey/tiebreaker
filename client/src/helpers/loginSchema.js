import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long')
    .required('Required')
});

export default LoginSchema;