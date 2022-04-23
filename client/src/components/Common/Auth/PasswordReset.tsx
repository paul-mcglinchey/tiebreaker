import { Formik, Form } from 'formik';
import { StyledField, Button, IconWrapper } from '..';

const PasswordReset = () => {

  const handleSubmit = (values: { password1: string, password2: string }) => {
    console.log(values)
  }

  return (
    <IconWrapper>
      <div className="absolute top-1/4 rounded w-full p-4 filter drop-shadow-sm">
        <Formik
          initialValues={{
            password1: '',
            password2: ''
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col space-y-4">
                <div className="flex-col space-y-2">
                  <StyledField name="password1" type="password" label="password1" errors={errors.password1} touched={touched.password1} />
                  <StyledField name="password2" type="password" label="password2" errors={errors.password2} touched={touched.password2} />
                </div>
                <div className="flex justify-between">
                  <Button content="Reset password" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </IconWrapper>

  )
}

export default PasswordReset;