import * as Yup from 'yup';

const groupValidationSchema = Yup.object().shape({
  groupName: Yup.string()
    .min(6, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required')
});

export default groupValidationSchema;