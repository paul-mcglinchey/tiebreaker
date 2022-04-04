import * as Yup from 'yup';

const clientValidationSchema = Yup.object().shape({
  name: Yup.object().shape({
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
      .max(100, 'Too Long!')
  }),
  contactInfo: Yup.object().shape({
    primaryEmail: Yup.string()
      .email('Invalid email')
      .required('Required'),
  }),
  birthdate: Yup.date()
    .max(new Date(), 'DOB Cannot be later than the current date')
    .min(new Date(1900, 0), 'Nobody is that old...'),
  address: Yup.object().shape({
    firstLine: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!'),
    secondLine: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!'),
    thirdLine: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!'),
    country: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!'),
    postCode: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .matches(/^\S+ ?\S+$/, 'Enter a valid Post Code')
  })
});

export default clientValidationSchema;