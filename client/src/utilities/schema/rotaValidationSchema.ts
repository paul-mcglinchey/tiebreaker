import * as Yup from 'yup';

const rotaValidationSchema = Yup.object().shape({
  startDate: Yup.date()
    .required('Required')
    .min(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1), 'Start date cannot be before today'),
  endDate: Yup.date()
    .required('Required')
    .min(Yup.ref('startDate'), 'End date cannot be before start date')
});

export default rotaValidationSchema;