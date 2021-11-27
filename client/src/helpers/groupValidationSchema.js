import * as Yup from 'yup';

const GroupSchema = Yup.object().shape({
  groupname: Yup.string()
    .min(6, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required')
});

export default GroupSchema;