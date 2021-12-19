import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  emailOrUsername: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(100, 'Too Long')
    .required('Required')
});

export default LoginSchema;